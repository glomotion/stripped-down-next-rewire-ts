import { useSimpleHook } from "./simple-number.hook";

interface MooPropTypes {
  name: string;
}

export const demoString = () => "how now, brown";

export function Moo({ name }: MooPropTypes) {
  const { number } = useSimpleHook();
  return (
    <div>
      {name} {demoString()} {number}
    </div>
  );
}
