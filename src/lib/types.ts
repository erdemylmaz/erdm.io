export type Lang = "en" | "tr";

export type NavItem = { id: string; label: string };

export type Hero = {
  first: string;
  last: string;
  role: string;
  tagline: string;
  status: string;
  cta1: string;
  cta2: string;
  foot1: string;
  foot2: string;
  year: string;
};

export type Fact = { label: string; icon: IconName; href?: string };

export type About = {
  eyebrow: string;
  h: string;
  p1: string;
  p2: string;
  links: { label: string; href: string }[];
  facts: Fact[];
  caption: [string, string];
};

export type ExpItem = {
  period: string;
  role: string;
  where: string;
  href?: string;
  tags: string[];
  bullets: string[];
};

export type Exp = { eyebrow: string; h: string; items: ExpItem[] };

export type ProjItem = {
  k: string;
  title: string;
  host: string;
  href?: string;
  desc: string;
  stack: string[];
  year: string;
};

export type Proj = {
  eyebrow: string;
  h: string;
  meta: string;
  items: ProjItem[];
};

export type StackItem = { name: string; note: string };
export type StackCat = { id: string; title: string; items: StackItem[] };
export type Stack = { eyebrow: string; h: string; categories: StackCat[] };

export type Edu = {
  eyebrow: string;
  h: string;
  school: string;
  schoolEm: string;
  degree: string;
  gpa: { label: string; value: string }[];
  courses: { code: string; name: string; term: string; hours?: string; credits?: string; ects?: string; prereq?: string }[];
  learningLabel: string;
  learning: string[];
};

export type PgMod = { title: string; desc: string; foot: string };
export type Playground = {
  eyebrow: string;
  h: string;
  lede: string;
  ports: PgMod;
  sql: PgMod;
  repl: PgMod;
  term: PgMod;
};

export type Writing = {
  eyebrow: string;
  h: string;
  empty: string;
  emptyDesc: string;
  cta: string;
  postsLabel: string;
  readMore: string;
  minRead: string;
};

export type Contact = {
  bigTop: string;
  bigBottom: string;
  email: string;
  socials: { gh: string; li: string; ig: string };
  socialsHref: { gh: string; li: string; ig: string };
  colophon: string;
  now: string;
};

export type Content = {
  nav: NavItem[];
  hero: Hero;
  about: About;
  exp: Exp;
  proj: Proj;
  stack: Stack;
  edu: Edu;
  playground: Playground;
  writing: Writing;
  contact: Contact;
};

export type IconName =
  | "pin"
  | "book"
  | "cup"
  | "globe"
  | "arrow"
  | "arrow-ne"
  | "github"
  | "linkedin"
  | "x"
  | "mail"
  | "spark"
  | "db"
  | "term"
  | "chart";
