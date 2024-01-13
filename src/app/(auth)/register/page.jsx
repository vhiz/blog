import RegisterForm from "@/components/RegisterForm";
export default function Register() {
  return (
    <div className="flex items-center justify-center">
      <div className=" w-full lg:w-[50vw] bg-secondary p-8 lg:p-12 flex flex-col text-center gap-7 rounded">
        <RegisterForm />
      </div>
    </div>
  );
}
