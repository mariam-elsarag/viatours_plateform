import { toast } from "react-toastify";
import type { UseFormSetError, FieldValues, Path } from "react-hook-form";

export const handleError = <T extends FieldValues>(
  error: any,
  setError?: UseFormSetError<T>,
  navigate?: (path: string) => void,
  item?: string
) => {
  const err = error?.response?.data;
  const details = err?.error?.email || err?.error?.password || err?.message;

  console.log(err, "error");

  const showToast = () => {
    toast.error(details || "Something went wrong. Please try again.");
  };

  switch (details) {
    case "password is not strong enough":
      showToast();
      setError?.("password" as Path<T>, { message: details });
      break;

    case "email should not be empty":
      showToast();
      setError?.("email" as Path<T>, { message: details });
      break;

    case "The email or password you entered is incorrect.":
      showToast();
      setError?.("email" as Path<T>, { message: details });
      setError?.("password" as Path<T>, { message: details });
      break;

    case "User not found":
    case "Email already exists":
      showToast();
      setError?.("email" as Path<T>, { message: details });
      break;

    case "Your account is not active. Please verify your account first. An OTP has been sent to your email for verification.":
      showToast();
      if (navigate && item) {
        navigate(`/account/${item}/activate`);
      }
      break;
    case "OTP expired":
    case "Invalid Otp":
      setError?.("otp" as Path<T>, { message: details });
      break;
    default:
      toast.error("Something went wrong. Please try again.");
      break;
  }
};
