import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { handleError } from "../../common/utils/handleError";
import axiosInstance from "../../service/axiosInstance";
import { API } from "../../service/apiUrl";
import { toast } from "react-toastify";
import { passwordPattern } from "../../common/constant/validator";
import { LockIcon } from "../../assets/icons/Icon";
import Form_Builder from "../../components/shared/form/Form_Builder";
import Button from "../../components/shared/button/Button";
import Unauth_Header from "./component/Unauth_Header";

const Reset_Password = () => {
  const { email } = useParams();
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
      email: email,
      password: null,
    },
    mode: "onChange",
  });

  //______________ function ___________
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await axiosInstance.patch(API.auth.resetPassword, data);

      if (response.status === 200) {
        navigate(`/account/`);
        toast.success("Password changed successfully");
      }
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  // ____________ list __________________
  const formList = [
    {
      id: 1,
      formType: "password",
      type: "password",
      fieldName: "password",
      label: "New password",

      placeholder: "password",
      validator: {
        required: "Password is required",
        pattern: {
          value: passwordPattern,
          message:
            "Password must be 8+ characters, with uppercase, lowercase, a number, and a special character.",
        },
      },
      icon: <LockIcon />,
    },
    {
      id: 2,
      formType: "password",

      type: "password",
      fieldName: "confirm_password",
      validator: {
        required: "confirm password is required",
        validate: (value) => {
          const password = getValues("password");
          return value === password || "Passwords do not match";
        },
      },
      placeholder: "Confirm password",
      label: "Confirm password",

      icon: <LockIcon />,
    },
  ];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-10 "
    >
      <Unauth_Header title="Reset password" />
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
          Reset password
        </Button>
      </fieldset>
    </form>
  );
};

export default Reset_Password;
