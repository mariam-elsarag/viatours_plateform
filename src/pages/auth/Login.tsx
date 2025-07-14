import React, { useState } from "react";
import { useAuth } from "../../context/auth/Auth_Context";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LockIcon, UserIcon } from "../../assets/icons/Icon";
import { emailRegex } from "../../common/constant/validator";
import Form_Builder from "../../components/shared/form/Form_Builder";
import Button from "../../components/shared/button/Button";
import { Checkbox } from "primereact/checkbox";
import Unauth_Header from "./component/Unauth_Header";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [remember, setRemember] = useState();
  const [loading, setLoading] = useState(false);

  // ___________ useform _________
  const {
    control,
    setError,

    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: null,
      password: null,
    },
    mode: "onChange",
  });

  //list
  const formList = [
    {
      id: 1,
      formType: "input",
      fieldName: "queryset",
      name: "Email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      validator: {
        required: "required_field",
        pattern: {
          value: emailRegex,
          message: "Please enter a valid email, e.g., example@domain.com.",
        },
      },
      icon: <UserIcon />,
    },
    {
      id: 2,
      formType: "password",
      fieldName: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      validator: {
        required: "Password is required",
      },
      icon: <LockIcon />,
      showForgetPassword: true,
    },
  ];

  const onSubmit = async (data) => {};
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-10 "
    >
      <Unauth_Header
        title="Sign ip"
        description={
          <p>
            <span>Don’t have an account? </span>
            <Link className="text-primary-500 underline" to="/account/register">
              Create now
            </Link>
          </p>
        }
      />
      <fieldset className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <Form_Builder
            formList={formList}
            control={control}
            errors={errors}
            loading={loading}
            setError={setError}
          />{" "}
          <div className="flex items-center justify-between gap-1">
            {/* remember me */}
            <div className="flex items-center gap-1 ">
              <Checkbox
                inputId="rememberUser"
                name="remember"
                value={remember}
                onChange={(e) => setRemember(e.checked)}
                checked={remember}
              />
              <label
                htmlFor="rememberUser"
                className="text-slate-500 body_lg cursor-pointer"
              >
                Remember me
              </label>
            </div>
            {/* remember me */}
            <Link
              to="/forget-password"
              className="underline text-primary-500 body_lg"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
        {/* button */}
        <Button
          buttonType="submit"
          hasFullWidth={true}
          disabled={loading}
          loading={loading}
        >
          Sign in
        </Button>
      </fieldset>
    </form>
  );
};

export default Login;
