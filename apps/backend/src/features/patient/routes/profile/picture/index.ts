import { Hono } from "hono";
import {encodeBase64} from 'hono/utils/encode'
import { AuthMiddleware } from "../../../../auth"
import service from "./service";
import type { paths } from "@beta-lyfe/api/types";
import {Storage} from '../../../../storage'


 export type Response =
   paths['/api/patients/profile/upload/profile-image']['post']['responses'][keyof paths['/api/patients/profile/upload/profile-image']['post']['responses']]['content']['application/json']


export default new Hono().post('/upload/profile-image',AuthMiddleware.middleware , async (c) => {
  try {
    let response:Response
    const body = await c.req.parseBody();
    const  file  = body['file'] as File
    const storageResult=await Storage.service.upload(file)
    if(storageResult.isErr){
      response={code : 'UNEXPECTED_ERROR'}
      return c.json(response)
    }

    const {public_id,url}=storageResult.value

    const result=await service({
        public_id,url
    })


    if(result.isErr){
      response={code:'UNEXPECTED_ERROR'}
      return c.json(response);
    }


      response={code : 'PROFILE_IMAGE_UPLOAD_SUCCESSFUL', data: {url:result.value?.url as string}}

    return c.json(response);
  } catch (error) {
    console.error('Upload error:', error);
    return c.json({code:'UNEXPECTED_ERROR'} ,500);
  }
});