import ErrorConection from "../../components/Features/errorConection";


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
