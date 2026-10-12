import { Button } from "./_v2/components/ui";
import StatusPage from "./_v2/components/status-page";
import Shell from "./_v2/shell";

export default function NotFound() {
  return (
    <Shell>
      <StatusPage
        code="404"
        title="This page does not exist."
        lead="The link may be broken, or the page may have moved. The projects and the blog are still where they were."
        actions={
          <>
            <Button href="/" variant="inverse">
              Back home
            </Button>
            <Button href="/projects" variant="secondary-light">
              All projects
            </Button>
          </>
        }
      />
    </Shell>
  );
}
