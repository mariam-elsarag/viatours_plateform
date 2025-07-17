import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { data, useNavigate } from "react-router-dom";
import { handleError } from "../../common/utils/handleError";
import axiosInstance from "../../service/axiosInstance";
import { API } from "../../service/apiUrl";
import { toast } from "react-toastify";
import { emailRegex } from "../../common/constant/validator";
import { EmailIcon } from "../../assets/icons/Icon";
import Button from "../../components/shared/button/Button";
import Form_Builder from "../../components/shared/form/Form_Builder";
import Unauth_Header from "./component/Unauth_Header";

const Forget_Password = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // ___________ useform _________
  const {
    control,
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  //__________________ function _______
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${API.auth.sendOtp}?type=forget`,
        data
      );
      if (response.status === 200) {
        toast.success("The verification code has been sent successfully.");
        navigate(`/account/${data?.email}/forget-password`);
      }
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  //list
  const formList = [
    {
      id: 1,
      formType: "input",
      fieldName: "email",
      name: "email",
      type: "email",
      label: "Email",
      placeholder: "email",
      validator: {
        required: "Email is required",
        pattern: {
          value: emailRegex,
          message: "Please enter a valid email, e.g., example@domain.com.",
        },
      },
      icon: <EmailIcon />,
    },
  ];
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-10 "
    >
      <Unauth_Header title="Forget password" />
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
          Next
        </Button>
      </fieldset>
    </form>
  );
};

export default Forget_Password;
