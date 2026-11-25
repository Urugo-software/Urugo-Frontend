export interface FooterLinkItem {
  title: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLinkItem[];
}

export interface FooterContactInfo {
  phone: {
    display: string;
    href: string;
  };
  email: {
    display: string;
    href: string;
  };
}

export const productColumn: FooterColumn = {
  title: "Product",
  links: [
    { title: "Properties", href: "/properties" },
    { title: "Features", href: "/features" },
    { title: "How it works", href: "/how-it-works" },
    { title: "Sign in", href: "/auth/sign-in" },
  ],
};

export const contactInfo: FooterContactInfo = {
  phone: {
    display: "+250 788 123 456",
    href: "tel:+250788123456",
  },
  email: {
    display: "info@urugo.rw",
    href: "mailto:info@urugo.rw",
  },
};

export const legalLinks: FooterLinkItem[] = [
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Terms of Service", href: "/terms" },
];
