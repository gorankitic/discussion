
// hooks
import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import Loader from "../components/Loader";
// uploadcare
import * as LR from "@uploadcare/blocks";
// react hook form
import { useForm } from "react-hook-form";
// yup validation
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
// assets
import { UserRound, Mail, Send } from "lucide-react";
// services
import { updateProfile } from "../services/userApi";

LR.registerBlocks(LR);

// validation schema
const updateProfileSchema = yup.object({
    email: yup.string().required('Email is required.').email('Provide valid email.'),
    name: yup.string().required("Name is required.")
}).required();

const Profile = () => {
    const { user, dispatch } = useAuthContext();
    const [imgId, setImgId] = useState("");
    const navigate = useNavigate();
    const ctxProviderRef = useRef(null);

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
        resolver: yupResolver(updateProfileSchema),
        defaultValues: {
            name: user.name,
            email: user.email
        }
    });

    useEffect(() => {
        const handleUpload = (e) => {
            setImgId(e.detail.allEntries[0].uuid);
        }
        ctxProviderRef.current?.addEventListener("common-upload-success", handleUpload);

        return () => {
            ctxProviderRef.current?.removeEventListener("common-upload-success", handleUpload);
        }
    }, []);

    const handleUpdate = async (data) => {
        const { name, email } = data;
        let photoUrl = "";
        if (imgId) {
            photoUrl = `${import.meta.env.VITE_UPLOADCARE_BASE_URL}/${imgId}/-/scale_crop/200x200/smart_objects_faces_points`
        } else if (user.photoUrl) {
            photoUrl = user.photoUrl;
        }
        try {
            const json = await updateProfile(name, email, photoUrl, user._id);
            localStorage.setItem('user', JSON.stringify(json.user));
            dispatch({ type: 'login', payload: json.user });
            navigate('/');
        } catch (error) {
            setError("root", { type: 'server', message: error.message });
        }
    }

    return (
        <form onSubmit={handleSubmit(handleUpdate)}>
            <h1 className="text-center text-2xl tracking-wide font-medium text-white">Edit your profile</h1>
            {imgId
                ?
                <img src={`${import.meta.env.VITE_UPLOADCARE_BASE_URL}/${imgId}/-/scale_crop/200x200/smart_objects_faces_points`} className="profile-img" />
                :
                user.photoUrl
                    ?
                    <img src={user.photoUrl} className="profile-img" />
                    :
                    (<div className="rounded-full mx-auto h-[200px] w-[200px] bg-white flex items-center justify-center">
                        <UserRound className="text-red-400 h-40 w-40 stroke-1" />
                    </div>)
            }
            <div className="text-center">
                <lr-config
                    ctx-name="upload-profile-photo"
                    pubkey={import.meta.env.VITE_UPLOADCARE_PUBKEY}
                    maxLocalFileSizeBytes={4000000}
                    multiple={false}
                    imgOnly={true}
                    sourceList="local, url"
                    useCloudImageEditor={false}
                />
                <lr-file-uploader-regular
                    css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.32.4/web/lr-file-uploader-regular.min.css"
                    ctx-name="upload-profile-photo"
                    class="my-config"
                />
                <lr-upload-ctx-provider ref={ctxProviderRef} ctx-name="upload-profile-photo" />
            </div>
            <>
                <div className="relative">
                    <input {...register("name")} type="text" autoComplete="off" className="form-input" />
                    <UserRound className="input-icon" />
                    {errors.name && <span className="error">{errors.name.message}</span>}
                </div>
                <div className="relative">
                    <input {...register("email")} type="text" autoComplete="off" className="form-input" />
                    <Mail className="input-icon" />
                    {errors.email && <span className="error">{errors.email.message}</span>}
                </div>
                {errors.root?.type === "server" && <p className="error">{errors.root.message}</p>}
                <button className="form-button" disabled={isSubmitting}>
                    {isSubmitting ? <Loader /> : "Update"}
                    <Send className="icon" />
                </button>
            </>

        </form >

    )
}

export default Profile;