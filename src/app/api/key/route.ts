// import { cookies } from "next/headers";
// import { APIKEY_STORAGE_NAME } from "@/providers";

// export async function GET() {
//   const cookieStore = await cookies();
//   const key = cookieStore.get(APIKEY_STORAGE_NAME)?.value;
//   return Response.json({ key });
// }

// export async function POST(req: Request) {
//   console.log("posting::/api/key/route.ts");
//   const { key } = await req.json();
//   try {
//     const cookieStore = await cookies();
//     cookieStore.set(APIKEY_STORAGE_NAME, key, {
//       httpOnly: true,
//     });
//     return Response.json({ status: "success" });
//   } catch (err) {
//     console.error(err);
//     return Response.json({ status: "failed" });
//   }
// }
