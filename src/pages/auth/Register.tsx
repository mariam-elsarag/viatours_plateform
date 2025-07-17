import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../service/axiosInstance";
import { API } from "../../service/apiUrl";
import { handleError } from "../../common/utils/handleError";
import { emailRegex, passwordPattern } from "../../common/constant/validator";
import { EmailIcon, LockIcon, UserIcon } from "../../assets/icons/Icon";
import Button from "../../components/shared/button/Button";
import Form_Builder from "../../components/shared/form/Form_Builder";
import Unauth_Header from "./component/Unauth_Header";

const Register = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  // ___________ useform _________
  const {
    control,
    setError,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: null,
    },
    mode: "onChange",
  });
  //list
  const formList = [
    {
      id: 0,
      formType: "input",
      fieldName: "fullName",
      name: "Full name",
      type: "Full name",
      label: "Full name",
      placeholder: "Full name",
      validator: {
        required: "Full name is required",
        maxLength: {
          value: "80",
          message: "Full name must be 80 characters or fewer.",
        },
      },
      icon: <UserIcon />,
    },
    {
      id: 1,
      formType: "input",
      fieldName: "email",
      name: "Email",
      type: "email",
      label: "Email",
      placeholder: "Email",
      validator: {
        required: "Email is required",
        pattern: {
          value: emailRegex,
          message: "Please enter a valid email, e.g., example@domain.com.",
        },
      },
      icon: <EmailIcon />,
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
        pattern: {
          value: passwordPattern,
          message:
            "Password must be 8+ characters, with uppercase, lowercase, a number, and a special character.",
        },
      },
      icon: <LockIcon />,
      showForgetPassword: false,
    },
  ];
  //______________ function ___________
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await axiosInstance.post(API.auth.register, data);

      if (response.status === 201) {
        navigate(`/account/${data?.email}/activate`);
        toast.success(response?.data?.message);
      }
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-10 "
    >
      <Unauth_Header
        title="Sign up"
        description={
          <p>
            <span>Do you have an account? </span>
            <Link className="text-primary-500 underline" to="/account">
              Sign In
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
        </div>
        {/* button */}
        <Button
          buttonType="submit"
          hasFullWidth={true}
          disabled={loading}
          loading={loading}
        >
          Sign up
        </Button>
      </fieldset>
    </form>
  );
};

export default Register;
