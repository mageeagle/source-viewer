"use client";
import Link from "next/link";
import { titleClass } from "../../constants/styles";

export default function Description({ noFade, editor }: { noFade?: boolean, editor?: boolean }) {
  return (
    <div className="max-w-screen ml-4">
      <div className={titleClass}> Source Viewer </div>
      <br />
      <div className="inline w-screen">
        <p>View Sound Sources represented by OSC Messages</p>
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
          By Eagle Wu 2023{" "}
          <a className="underline" href="https://qqaqq.net">
            Website
          </a>
        </p>
        <br />
        {noFade ? (
          <>
            <p>
              Individual Opacity Settings are disabled in this version in exchange for better
              performance.
            </p>
            <p>
              {"Use this "}
              <Link className="underline" href="/fade">
                Version
              </Link>{" "}
              for Opacity Support and Source Fading.
            </p>
          </>
        ) : (
          <>
            <p>
              Opacity is enabled for source fading and opacity changing for individual sources/speakers.
            </p>
            <p>
              {"Use this "}
              <Link className="underline" href="/">
                Version
              </Link>{" "}
              if you encounter performance issues.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
