export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const PageHeader = (props: PageHeaderProps) => (
  <header class={props.className || "page-header"}>
    <h1>{props.title}</h1>
    {props.subtitle && <p class="subtitle">{props.subtitle}</p>}
  </header>
);
