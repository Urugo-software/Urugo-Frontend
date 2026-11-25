import type { Ref } from "react";

import { AuthFormHeader } from "../AuthFormHeader";

function SignUpFormHeader({
  stepLabel,
  title,
  description,
  headingRef,
}: {
  stepLabel: string;
  title: string;
  description: string;
  headingRef?: Ref<HTMLHeadingElement>;
}) {
  return (
    <AuthFormHeader
      eyebrow={stepLabel}
      title={title}
      description={description}
      headingRef={headingRef}
    />
  );
}

export default SignUpFormHeader;
