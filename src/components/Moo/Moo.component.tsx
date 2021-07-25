import { useSimpleHook } from "./simple-number.hook";
import { SimpleText } from "@imtbl/design-system/dist/minified";

interface MooPropTypes {
  name: string;
}

export const demoFunction = () => "how now, brown";
export const demoObject = {
  moo: "cow",
};
export const demoString = "i wish i could be rewired ...";

export function Moo({ name }: MooPropTypes) {
  const { number } = useSimpleHook();
  return (
    <>
      <div>
        {name} {demoFunction()} {number} {JSON.stringify(demoObject)}{" "}
        {demoString}
      </div>
      <SimpleText>demo DS component</SimpleText>
    </>
  );
}
