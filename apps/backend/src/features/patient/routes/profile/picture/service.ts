import { PatientRepository } from "../../..";
import type { PatientProfile } from "../../../../database/schema";

export default async (payload:PatientProfile['profile_picture'])=>{
    return await PatientRepository.saveProfileImage(payload)
}