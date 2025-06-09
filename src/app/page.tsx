import Link from "next/link";

function Page() {
  return (
    <div className="p-4 h-svh grid content-center justify-items-center gap-8 grid-flow-col max-md:grid-flow-row max-md:gap-6">
      <Link href="/m">
        <div className="p-4 min-w-md max-lg:min-w-xs rounded-xl border transition-[background-color] bg-tertiary-100 hover:bg-tertiary-200">
          <h4 className="font-semibold">Simultaneous</h4>
          <p className="mt-4 text-tertiary-800">
            Chat with multiple assistants at once.
          </p>
        </div>
      </Link>
      <Link href="/s">
        <div className="p-4 min-w-md max-lg:min-w-xs rounded-xl border transition-[background-color] bg-tertiary-100 hover:bg-tertiary-200">
          <h4 className="font-semibold">Separate</h4>
          <p className="mt-4 text-tertiary-800">
            Interact with each assistant separately.
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Page;
