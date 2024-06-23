import toast from "react-hot-toast";
import useFile from "src/store/useFile";
import useJson from "src/store/useJson";

const useJsonQuery = () => {
  const getJson = useJson(state => state.getJson);
  const setContents = useFile(state => state.setContents);

  const updateJson = async (query: string, cb?: () => void) => {
    try {
      const jq = await import("jq-web");
      const res = await jq.promised.json(JSON.parse(getJson()), query);

      setContents({ contents: JSON.stringify(res, null, 2) });
      cb?.();
    } catch (error) {
      console.error(error);
      toast.error("Unable to process the request.");
    }
  };

  return { updateJson };
};

export default useJsonQuery;
