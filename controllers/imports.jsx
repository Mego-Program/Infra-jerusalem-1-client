import ErrorConection from "../src/components/Features/errorConection";


const defaultRoutesErrorConection = [
  {
    path: "",
    element: <ErrorConection />,
  },
];

export async function RouterSpecsImpurt() {
  try {
    const resRouter = await import("remoteSpecs/SpecsProject");
    return resRouter.RouterSpecs
  } catch (error) {
    console.error(error);
    return defaultRoutesErrorConection
  }
}
export async function RouterProImpurt() {
  try {
    const resRouter = await import("remotePro/proProject");
    console.log(resRouter);
    return resRouter.RouterPro
  } catch (error) {
    console.error(error);
    console.log("in");

    return defaultRoutesErrorConection[0].element
  }
}
