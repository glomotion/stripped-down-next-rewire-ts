interface MooPropTypes {
  name: string;
}

export function Moo({ name }: MooPropTypes) {
  return <div>{name}</div>;
}
