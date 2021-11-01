import { FlexLayout, SectionHeading } from "@imtbl/design-system";
import { Moo } from "components/Moo";

export default function Home() {
  return (
    <>
      <FlexLayout
        alignItems="center"
        justifyContent="center"
        flexGrow={1}
        flexDirection="column"
      >
        <SectionHeading textAlign="center">
          hello world --- home page
        </SectionHeading>
        <Moo name="hello" />
      </FlexLayout>
    </>
  );
}
