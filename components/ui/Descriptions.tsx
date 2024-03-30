"use client";
import Link from "next/link";
import { titleClass } from "../../constants/styles";

export default function Description({
  noFade,
  editor,
}: {
  noFade?: boolean;
  editor?: boolean;
}) {
  return (
    <div className="max-w-screen ml-4">
      <div className={titleClass}>
        {editor ? "Source Editor" : "Source Viewer"}
      </div>
      <br />
      <div className="inline w-screen">
        <p>
          {editor ? "Edit" : "View"} Sound Sources represented by OSC Messages
        </p>
        <p>
          Documentation / Feature request / Bug Report{" "}
          <a
            className="underline"
            href="https://github.com/mageeagle/source-viewer"
          >
            Github Repo
          </a>
        </p>
        <p className="md:hidden">
          {" "}
          Use a computer with a keyboard for more options.
        </p>
        <p>
          By Eagle Wu{" "}
          <a className="underline" href="https://qqaqq.net">
            Website
          </a>
        </p>
        <br />
        {noFade ? (
          <>
            <p>
              Individual Source/Speaker Settings are disabled in this version in
              exchange for better performance.
            </p>
            <p>
              <Link className="underline" href="/">
                Regular Mode
              </Link>
            </p>
            <p>
              <Link className="underline" href="/editor">
                Editor Mode
              </Link>
            </p>
          </>
        ) : (
          <>
            {editor ? (
              <p>
                <Link className="underline" href="/">
                  Regular Mode
                </Link>
              </p>
            ) : (
              <p>
                <Link className="underline" href="/editor">
                  Editor Mode
                </Link>
              </p>
            )}
            <p>
              {"Use this if you encounter performance issues: "}
              <Link className="underline" href="/performance">
                Performance Mode
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
