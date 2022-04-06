import Head from "next/head";
import 'twin.macro';
import LoginForm from "../../components/Auth/LoginForm";
import withoutAuth from "../../components/Utils/HOC/WithoutAuth";

const Auth = (): JSX.Element => {
  return (
    <div tw={"bg-[#003366] flex flex-col items-center h-screen justify-center items-center"}>
      <Head>
        <title>Auth - Wave</title>
      </Head>
      <div tw={"p-12 bg-white rounded-2xl max-w-[1366px] mx-44 my-12"}>
        <div tw={"text-center mb-6"}>
          <p tw={"text-2xl font-medium"}>Sign in ke Dasbor Bisnis</p>
          <p tw={"text-xs"}>Masuk sebagai admin bisnis kamu dan kelola bisnis kamu</p>
        </div>
        <LoginForm/>
      </div>
    </div>
  );
}

export default withoutAuth(Auth);