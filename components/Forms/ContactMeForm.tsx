// @ts-nocheck

import React, { useState, forwardRef } from "react";
import { TiTick } from "react-icons/ti";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  SetValue,
} from "react-hook-form";
import { InputProps } from "@/types/types.config";
import { FORM_DATA } from "@/data/static";
import Loader from "../ui/Loader";
import { sendMessageToTelegram } from "@/lib/utils";

interface FormField {
  firstName: string;
  secondName: string;
  phoneNumber: string;
  email: string;
  privacyConsent: boolean;
  description: string;
}

// Маска для номера телефона
const normalizePhoneNumber = (value: string) => {
  // Удаляем все символы, кроме цифр
  const cleanedValue = value.replace(/\D/g, "");

  // Заменяем первую цифру 7 или 8 на +7
  let normalizedValue = cleanedValue;
  if (cleanedValue.startsWith("7")) {
    normalizedValue = cleanedValue.replace(/^7/, "+7");
  } else if (cleanedValue.startsWith("8")) {
    normalizedValue = cleanedValue.replace(/^8/, "+7");
  }

  // Добавляем маску +7 (999) 999-99-99
  const formattedValue = normalizedValue.replace(
    /^\+7(\d{3})(\d{3})(\d{2})(\d{2}).*/,
    "+7 ($1) $2-$3-$4",
  );

  return formattedValue;
};

const ContactMeForm = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormField>({});

  const [loading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormField> = async (data, e) => {
    e?.preventDefault();

    try {
      setIsLoading(true); // Устанавливаем индикатор загрузки в true
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.secondName,
          phone_number: data.phoneNumber,
          email: data.email,
          description: data.description,
          consent_to_data_processing: data.privacyConsent,
        }),
      });

      if (!response.ok) {
        const result = await response.json();
        console.error("Ошибка при добавлении пользователя:", result.error);
        alert("Ошибка при добавлении пользователя");
        return; // Завершаем выполнение, если ошибка
      }

      const result = await response.json();

      if (response.ok) {
        console.log("Пользователь успешно добавлен:", result);
        alert("Пользователь успешно добавлен!"); // Уведомление об успешной отправке формы

        // Отправляем сообщение в Telegram после успешного добавления
        await sendMessageToTelegram({
          first_name: data.firstName,
          last_name: data.secondName,
          phone_number: data.phoneNumber,
          email: data.email,
          description: data.description,
          consent_to_data_processing: data.privacyConsent,
        });

        onClose(); // Закрыть форму после успешной отправки
      } else {
        console.error("Ошибка при добавлении пользователя:", result.error);
        alert("Ошибка при добавлении пользователя"); // Уведомление об ошибке
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      alert("Ошибка при отправке формы"); // Уведомление об ошибке
    } finally {
      setIsLoading(false); // Устанавливаем индикатор загрузки в false после завершения операции
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex size-full flex-col justify-between rounded-2xl bg-black-400 p-10 font-secondary text-white/70 shadow-xl"
      action=""
      method="POST"
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.3,
        type: "spring",
        damping: 50,
        stiffness: 200,
      }}
      exit={{ y: "100%", opacity: 0 }}
    >
      <div className="flex items-center justify-between">
        {/* Заголовок связаться */}
        <div className="flex w-max flex-col gap-4">
          <p className="text-4xl text-white">Связаться</p>
          <div className="h-[2px] bg-white"></div>
        </div>

        {/* Cross Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="group relative flex h-14 w-14 items-center justify-center overflow-hidden transition-all hover:scale-105"
        >
          <span className="absolute h-1 w-14 rotate-45 transform bg-white transition-all duration-100 ease-in-out group-hover:bg-yellow"></span>
          <span className="absolute h-1 w-14 -rotate-45 transform bg-white transition-all delay-200 duration-100 ease-in-out group-hover:bg-yellow"></span>
        </button>
      </div>

      {/* Имя */}
      <div className="flex justify-between gap-4 max-sm:flex-col">
        <div className="flex w-1/2 flex-col gap-2 max-sm:w-full">
          <Input
            {...FORM_DATA[0]}
            classNames=""
            register={register}
            validation={{
              required: "Имя обязательно",
              minLength: { value: 2, message: "Минимум 2 символа" },
            }}
          />

          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        {/* Фамилия */}
        <div className="flex w-1/2 flex-col gap-2 max-sm:w-full">
          <Input
            {...FORM_DATA[1]}
            classNames=""
            register={register}
            validation={{
              required: "Фамилия обязательна",
              minLength: { value: 2, message: "Минимум 2 символа" },
            }}
          />
          {errors.secondName && (
            <p className="text-red-500">{errors.secondName.message}</p>
          )}
        </div>
      </div>

      {/* Телефон */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phone-number">Телефон</label>
        <input
          type="tel"
          id="phone-number"
          placeholder="+7"
          className="h-14 rounded-lg border border-black-500 bg-black-300 pl-2 placeholder:font-normal placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/10"
          {...register("phoneNumber", {
            required: "Телефон обязателен",
            onChange: (e) => {
              const normalizedValue = normalizePhoneNumber(e.target.value);
              setValue("phoneNumber", normalizedValue);
            },
            minLength: { value: 16, message: "Минимум 11 символов" },
          })}
        />

        {errors.phoneNumber && (
          <p className="text-red-500">{errors.phoneNumber.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Input
          {...FORM_DATA[3]}
          register={register}
          validation={{
            required: "Email обязателен",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Введите правильный email",
            },
          }}
        />

        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <textarea
        placeholder={FORM_DATA[4].placeholder}
        {...register("description")}
        className="resize-none overflow-hidden rounded-lg bg-black-300 p-2 text-white/70 placeholder:font-secondary placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/10"
      />

      {/* Согласие */}
      <div className="flex flex-col gap-2">
        <CheckBox
          setValue={setValue}
          register={register}
          validation={{
            required: "Согласие обязательно",
          }}
        />
        {errors.privacyConsent && (
          <p className="text-red-500">{errors.privacyConsent.message}</p>
        )}
      </div>

      {loading && (
        <div className="-z-1 absolute inset-0 rounded-2xl bg-black-600/50" />
      )}

      {loading ? (
        <Loader
          className="z-100 bg-black-300"
          childrenClassName="bg-yellow z-100"
        />
      ) : (
        <button className="w-full rounded-xl bg-black-500 py-3 text-white hover:bg-black-300 hover:text-yellow focus:outline-none focus:ring-1 focus:ring-white/10">
          Отправить заявку
        </button>
      )}
    </motion.form>
  );
};

export default ContactMeForm;

const CheckBox = ({
  register,
  validation,
  setValue,
}: {
  register: UseFormRegister<FormField>;
  validation: {};
  setValue: SetValue<FormField>;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    setValue("privacyConsent", newCheckedState); // Обновляем значение в react-hook-form
  };

  return (
    <div className="relative flex items-center gap-3">
      <input
        type="checkbox"
        id="agreemnet"
        {...register("privacyConsent", validation)}
        className="s-0 absolute opacity-0 hover:cursor-pointer"
        checked={isChecked}
        onChange={handleCheck}
      />
      <div
        className="z-100 relative grid size-5 place-items-center rounded border border-white hover:cursor-pointer"
        onClick={handleCheck}
      >
        {isChecked && <TiTick className="font-thin text-yellow" />}
      </div>
      <label htmlFor="agreement" onClick={handleCheck}>
        Я соглашаюсь с политикой конфиденциальности
      </label>
    </div>
  );
};

// Компонент с forwardRef для передачи рефа
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      placeholder,
      type,
      id,
      name,
      classNames = "",
      register,
      validation = {},
    },
    forwardedRef, // реф, переданный в компонент
  ) => {
    return (
      <div
        className={twMerge(
          "flex flex-col gap-2 overflow-hidden text-base font-medium tracking-wider",
          classNames,
        )}
      >
        <label htmlFor={id}>{label}</label>
        <input
          ref={forwardedRef} // Передаем реф
          type={type}
          placeholder={placeholder}
          id={id}
          name={name}
          {...(register ? register(name, validation) : {})} // Если register не передан, просто рендерим обычный инпут
          className="h-14 rounded-lg border border-black-500 bg-black-300 pl-2 placeholder:font-normal placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-white/10"
        />
      </div>
    );
  },
);

ContactMeForm.displayName = "ContactMeForm";
