"use client";
import { useEffect, useState } from "react";
import { GitCommit, GitMerge, GitPullRequest, GitBranch, Star, AlertCircle } from "lucide-react";

type GHEvent = {
  id: string;
  type: string;
  repo: { name: string };
  created_at: string;
  payload: Record<string, unknown>;
};

type FeedItem = {
  id: string;
  icon: React.ReactNode;
  label: string;
  repo: string;
  time: string;
};

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function parseEvent(e: GHEvent): FeedItem | null {
  const repo = e.repo.name.replace(/^[^/]+\//, "");
  const time = timeAgo(e.created_at);

  switch (e.type) {
    case "PushEvent": {
      const commits = e.payload.commits as Array<{ message: string }> | undefined;
      const msg = commits?.[0]?.message?.split("\n")[0] ?? "pushed commits";
      return { id: e.id, icon: <GitCommit size={14} />, label: msg, repo, time };
    }
    case "PullRequestEvent": {
      const pr = e.payload.pull_request as { title: string; merged: boolean } | undefined;
      const action = e.payload.action as string;
      if (action === "closed" && pr?.merged)
        return { id: e.id, icon: <GitMerge size={14} />, label: `merged: ${pr.title}`, repo, time };
      if (action === "opened")
        return { id: e.id, icon: <GitPullRequest size={14} />, label: `opened PR: ${pr?.title}`, repo, time };
      return null;
    }
    case "CreateEvent": {
      const ref = e.payload.ref as string | null;
      const refType = e.payload.ref_type as string;
      if (refType === "branch")
        return { id: e.id, icon: <GitBranch size={14} />, label: `created branch ${ref}`, repo, time };
      return null;
    }
    case "WatchEvent":
      return { id: e.id, icon: <Star size={14} />, label: "starred", repo, time };
    case "IssuesEvent": {
      const issue = e.payload.issue as { title: string } | undefined;
      const action = e.payload.action as string;
      return { id: e.id, icon: <AlertCircle size={14} />, label: `${action} issue: ${issue?.title}`, repo, time };
    }
    default:
      return null;
  }
}

export default function GitHubActivity() {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/Schoji/events/public?per_page=30")
      .then((r) => r.json())
      .then((data: GHEvent[]) => {
        const parsed = data.flatMap((e) => {
          const item = parseEvent(e);
          return item ? [item] : [];
        }).slice(0, 6);
        setItems(parsed);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex flex-col gap-3">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-14 rounded-xl bg-zinc-800/40 animate-pulse"
          />
        ))}
      </div>
    );

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-4 transition-colors hover:border-zinc-700"
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 8px var(--accent)",
              }}
            />
            <span className="truncate text-zinc-200">
              {item.label}{" "}
              <span style={{ color: "var(--accent)" }}>{item.repo}</span>
            </span>
          </div>
          <span className="text-zinc-500 text-sm shrink-0">{item.time}</span>
        </div>
      ))}
    </div>
  );
}
