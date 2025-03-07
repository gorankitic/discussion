// components
import UpdateUserDataForm from "@/features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "@/features/authentication/UpdatePasswordForm";

const Settings = () => {
    return (
        <main className="flex flex-1 flex-col gap-12 mx-auto mt-10 w-lg">
            <h1 className="text-2xl font-medium">Update your account</h1>
            <section>
                <h1 className="text-xl mb-4">Update user data</h1>
                <UpdateUserDataForm />
            </section>
            <section>
                <h1 className="text-xl mb-4">Update password</h1>
                <UpdatePasswordForm />
            </section>
        </main>
    )
}

export default Settings;