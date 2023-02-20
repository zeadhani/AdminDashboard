import authFetch from "../../../services/interceptors";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { messageCountActions } from "../../../store/messageCountSlice";

function useMessage() {
  const dispatch = useDispatch();
  const handleCount = (count) => {
    dispatch(
      messageCountActions.setcount({
        count,
      })
    );
  };

  const getCount = async () => {
    try {
      const data = await authFetch.get("/contactus/count");
      handleCount(data.data.count);
    } catch (error) {}
  };
  useEffect(() => {
    getCount();
  }, []);
}

export default useMessage;
