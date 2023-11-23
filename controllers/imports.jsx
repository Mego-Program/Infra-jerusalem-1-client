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
    return resRouter.RouterPro
  } catch (error) {
    console.error(error);
    return defaultRoutesErrorConection[0].element
  }
}
export async function RouterMessageImpurt() {
  try {
    const resRouter = await import("remoteMessage/messageProject");
    return resRouter.routeMessage
  } catch (error) {
    console.error(error);
    return defaultRoutesErrorConection[0].element
  }
}
