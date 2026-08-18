
import SectionContainer from "./SectionContainer";

function FooterSection() {
  return (
    <SectionContainer className="w-full max-w-7xl mx-auto">
      <footer>
        <div className="flex py-6 justify-between text-xs text-faint flex-wrap gap-2.5 pt-5 border-t border-line">
          <div>{`© 2026 Urugo. All rights reserved.`}</div>
          <div>{`Built for Rwanda's rental market.`}</div>
        </div>
      </footer>
    </SectionContainer>
  );
}

export default FooterSection;
