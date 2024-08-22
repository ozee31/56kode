export interface Props {
  tags: string[];
  size?: "sm" | "lg";
}

export default function Tags({ tags, size = "sm" }: Props) {
  return (
    <ul>
      {tags.map(tag => (
        <li
          className={`inline-block ${
            size === "sm"
              ? "my-1 underline-offset-4"
              : "mx-1 my-3 underline-offset-8"
          }`}
        >
          <a
            href={`/tags/${tag}/`}
            className={`${size === "sm" ? "text-sm" : "text-lg"} group relative pr-2 underline decoration-dashed hover:-top-0.5 hover:text-skin-accent focus-visible:p-1`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`-mr-5 h-6 w-6 text-skin-base opacity-80 group-hover:fill-skin-accent ${
                size === "sm" ? "scale-75" : "scale-110"
              }`}
            >
              <path d="M16.018 3.815 15.232 8h-4.966l.716-3.815-1.964-.37L8.232 8H4v2h3.857l-.751 4H3v2h3.731l-.714 3.805 1.965.369L8.766 16h4.966l-.714 3.805 1.965.369.783-4.174H20v-2h-3.859l.751-4H21V8h-3.733l.716-3.815-1.965-.37zM14.106 14H9.141l.751-4h4.966l-.752 4z" />
            </svg>
            &nbsp;&nbsp;<span>{tag}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
