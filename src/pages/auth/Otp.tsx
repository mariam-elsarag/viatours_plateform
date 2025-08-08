import React, { useEffect, useState } from "react";

//lib
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { data, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../service/axiosInstance";
import { API } from "../../service/apiUrl";
import { toast } from "react-toastify";
import { handleError } from "../../common/utils/handleError";
import Unauth_Header from "./component/Unauth_Header";
import Form_Builder from "../../components/shared/form/Form_Builder";
import Button from "../../components/shared/button/Button";

const Otp = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isActivate = location.pathname.includes("activate");

  //for resend
  const initialTime = parseInt(Cookies.get("otp_timer"));
  const [remainingTime, setRemainingTime] = useState(initialTime);

  const title = isActivate ? "Activate account" : "Forget password";
  const des = isActivate
    ? "We've sent a verification code to your email. Please enter it below to activate your account."
    : "Enter your email address and we’ll send you a link to reset your password.";
  // ___________ useform _________
  const {
    control,
    setError,

    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      email: email,
      otp: "",
    },
    mode: "onChange",
  });

  //____________ function ____________
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axiosInstance.post(
        `${API.auth.verifyOtp}?type=${isActivate ? "activate" : "forget"}`,
        data
      );
      const message = isActivate
        ? "Account verified successfully"
        : "OTP verified successfully";
      const nav = isActivate
        ? `/account/`
        : `/account/${data?.email}/reset-password`;
      if (res.status === 200) {
        toast.success(message);
        navigate(nav);
      }
    } catch (err) {
      handleError(err, setError);
    } finally {
      setLoading(false);
    }
  };
  //resend otp
  const reSendOTP = async () => {
    setRemainingTime(60);
    Cookies.set("otp_timer", 60, { expires: 1 / 1440 });
    try {
      const response = await axiosInstance.post(
        `${API.auth.sendOtp}?type=${isActivate ? "activate" : "forget"}`,
        {
          email,
        }
      );
      if (response.status === 200) {
        toast.success("The verification code has been sent successfully.");
      }
    } catch (err) {
      handleError(err, setError);
    }
  };

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          Cookies.set("otp_timer", newTime, { expires: 1 / 1440 });
          return newTime;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [remainingTime]);

  const renderTime = () => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return (
      <p role="button" className="flex_center gap-2">
        <span className="text-on-surface-tertiary body_md">Resend after</span>

        <span className="text-on-container-secondary title_md font-medium">
          {`${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}
        </span>
      </p>
    );
  };

  // list
  const formList = [
    {
      id: 0,
      formType: "otp",
      fieldName: "otp",
      className: "justify-center ",
      validator: {
        required: "OTP is required",
        pattern: {
          value: /^[0-9]+$/,
          message: "must_be_number",
        },
        validate: (value) => {
          return value?.length === 6 || "OTP is required";
        },
      },
    },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-10 "
    >
      <Unauth_Header title={title} description={des} variant="center" />
      <fieldset className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <Form_Builder
            formList={formList}
            control={control}
            errors={errors}
            loading={loading}
            setError={setError}
          />{" "}
          <p className="text-neutral-500 body_md font-normal flex_center gap-2 ">
            {remainingTime === 0 || !remainingTime ? (
              <p className="flex_center_y gap-2">
                <span>Didn’t receive a code?</span>
                <span
                  onClick={reSendOTP}
                  className="title_md font-medium text-primary-500 cursor-pointer "
                >
                  Resend
                </span>
              </p>
            ) : (
              <p>{renderTime()}</p>
            )}
          </p>
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

export default Otp;
