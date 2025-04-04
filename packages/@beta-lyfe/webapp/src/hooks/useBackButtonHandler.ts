import { useEffect } from "react";
import { App } from "@capacitor/app";
import { Device } from "@capacitor/device";
import { useRouter } from "@tanstack/react-router";

const useBackButtonHandler = () => {
  const router = useRouter();

  useEffect(() =>{
      const isAndroid=Device.getInfo()
      .then(info=>info.platform==='android')

    const backButtonListener = App.addListener("backButton", (x) => {
                console.log("clicking back button")
              if (router.history.canGoBack()){
                console.log("clicking is going back")
                router.history.back();
              } else {
                console.log("app exited")
                App.exitApp()
              }
        })

        return ()=>{backButtonListener.then(btnHandler=>{
            btnHandler.remove()
        })}
    },[router])
}

export default useBackButtonHandler;
