import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  gender: string;
  sections: string[];
  city: string;
  reportTopic: string;
  reportAnnotation: string;
  file?: File;
}

interface FormErrors {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  gender?: string;
  sections?: string;
  city?: string;
  reportTopic?: string;
  reportAnnotation?: string;
}

const ConferenceForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    gender: "",
    sections: [],
    city: "",
    reportTopic: "",
    reportAnnotation: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cities = [
    "Москва",
    "Санкт-Петербург",
    "Архангельск",
    "Астрахань",
    "Другой",
  ];
  const availableSections = [
    "Искусственный интеллект",
    "Веб-разработка",
    "Мобильные технологии",
    "Кибербезопасность",
    "DevOps и облачные технологии",
  ];

  const validateField = (
    name: string,
    value: string | string[],
  ): string | undefined => {
    switch (name) {
      case "firstName":
        if (!value || typeof value !== "string" || !value.trim())
          return "Имя обязательно для заполнения";
        if (value.trim().length < 2)
          return "Имя должно содержать минимум 2 символа";
        if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(value))
          return "Имя может содержать только буквы, пробелы и дефисы";
        break;

      case "middleName":
        if (value && typeof value === "string" && value.trim()) {
          if (value.trim().length < 2)
            return "Отчество должно содержать минимум 2 символа";
          if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(value))
            return "Отчество может содержать только буквы, пробелы и дефисы";
        }
        break;

      case "lastName":
        if (!value || typeof value !== "string" || !value.trim())
          return "Фамилия обязательна для заполнения";
        if (value.trim().length < 2)
          return "Фамилия должна содержать минимум 2 символа";
        if (!/^[а-яёА-ЯЁa-zA-Z\s-]+$/.test(value))
          return "Фамилия может содержать только буквы, пробелы и дефисы";
        break;

      case "phone":
        if (!value || typeof value !== "string" || !value.trim())
          return "Телефон обязателен для заполнения";
        const phoneRegex =
          /^(\+7|8)?[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
        if (!phoneRegex.test(value.replace(/\s/g, "")))
          return "Введите корректный номер телефона";
        break;

      case "email":
        if (!value || typeof value !== "string" || !value.trim())
          return "Email обязателен для заполнения";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Введите корректный email адрес";
        break;

      case "gender":
        if (!value || typeof value !== "string" || !value.trim())
          return "Выберите пол";
        break;

      case "sections":
        if (!Array.isArray(value) || value.length === 0)
          return "Выберите хотя бы одну секцию";
        break;

      case "city":
        if (!value || typeof value !== "string" || !value.trim())
          return "Выберите город";
        break;

      case "reportTopic":
        if (!value || typeof value !== "string" || !value.trim())
          return "Тема доклада обязательна";
        if (value.trim().length < 5)
          return "Тема доклада должна содержать минимум 5 символов";
        break;

      case "reportAnnotation":
        if (!value || typeof value !== "string" || !value.trim())
          return "Аннотация доклада обязательна";
        if (value.trim().length < 20)
          return "Аннотация должна содержать минимум 20 символов";
        break;

      default:
        return undefined;
    }
    return undefined;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSectionChange = (section: string, checked: boolean) => {
    const newSections = checked
      ? [...formData.sections, section]
      : formData.sections.filter((s) => s !== section);

    setFormData((prev) => ({
      ...prev,
      sections: newSections,
    }));

    const error = validateField("sections", newSections);
    setErrors((prev) => ({
      ...prev,
      sections: error,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData((prev) => ({
      ...prev,
      file,
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Валидация обычных полей
    [
      "firstName",
      "lastName",
      "phone",
      "email",
      "gender",
      "city",
      "reportTopic",
      "reportAnnotation",
    ].forEach((key) => {
      const value = formData[key as keyof FormData];
      const error = validateField(key, value as string);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
      }
    });

    // Валидация отчества (необязательное поле)
    if (formData.middleName) {
      const error = validateField("middleName", formData.middleName);
      if (error) {
        newErrors.middleName = error;
      }
    }

    // Валидация секций
    const sectionsError = validateField("sections", formData.sections);
    if (sectionsError) {
      newErrors.sections = sectionsError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitted(true);
      console.log("Форма отправлена:", formData);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto bg-green-50 border-green-200">
        <CardContent className="pt-6 text-center">
          <div className="text-green-600 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-green-800 mb-2">
            Заявка отправлена!
          </h2>
          <p className="text-green-700">
            Спасибо за регистрацию на конференцию. Мы свяжемся с вами в
            ближайшее время для подтверждения участия.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-gray-800">
          Форма заявки на участие в конференции
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Персональные данные */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="firstName"
                className="text-sm font-medium text-gray-700"
              >
                Имя *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`${errors.firstName ? "border-red-500 focus:border-red-500" : "border-gray-300"}`}
                placeholder="Введите ваше имя"
              />
              {errors.firstName && (
                <p className="text-sm text-red-600 mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="middleName"
                className="text-sm font-medium text-gray-700"
              >
                Отчество
              </Label>
              <Input
                id="middleName"
                name="middleName"
                type="text"
                value={formData.middleName}
                onChange={handleInputChange}
                className={`${errors.middleName ? "border-red-500 focus:border-red-500" : "border-gray-300"}`}
                placeholder="Введите ваше отчество"
              />
              {errors.middleName && (
                <p className="text-sm text-red-600 mt-1">{errors.middleName}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="lastName"
              className="text-sm font-medium text-gray-700"
            >
              Фамилия *
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`${errors.lastName ? "border-red-500 focus:border-red-500" : "border-gray-300"}`}
              placeholder="Введите вашу фамилию"
            />
            {errors.lastName && (
              <p className="text-sm text-red-600 mt-1">{errors.lastName}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Контактный телефон *
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className={`${errors.phone ? "border-red-500 focus:border-red-500" : "border-gray-300"}`}
                placeholder="+7 (999) 123-45-67"
              />
              {errors.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Пол *</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => handleSelectChange("gender", value)}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="М" id="male" />
                  <Label htmlFor="male">М</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Ж" id="female" />
                  <Label htmlFor="female">Ж</Label>
                </div>
              </RadioGroup>
              {errors.gender && (
                <p className="text-sm text-red-600 mt-1">{errors.gender}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300"}`}
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Секции конференции */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Секции, в которых примите участие *
            </Label>
            <div className="space-y-2">
              {availableSections.map((section) => (
                <div key={section} className="flex items-center space-x-2">
                  <Checkbox
                    id={section}
                    checked={formData.sections.includes(section)}
                    onCheckedChange={(checked) =>
                      handleSectionChange(section, checked as boolean)
                    }
                  />
                  <Label htmlFor={section} className="text-sm">
                    {section}
                  </Label>
                </div>
              ))}
            </div>
            {errors.sections && (
              <p className="text-sm text-red-600 mt-1">{errors.sections}</p>
            )}
          </div>

          {/* Город */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Город *</Label>
            <Select
              value={formData.city}
              onValueChange={(value) => handleSelectChange("city", value)}
            >
              <SelectTrigger
                className={`${errors.city ? "border-red-500 focus:border-red-500" : "border-gray-300"}`}
              >
                <SelectValue placeholder="Выберите город" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && (
              <p className="text-sm text-red-600 mt-1">{errors.city}</p>
            )}
          </div>

          {/* Доклад */}
          <div className="space-y-2">
            <Label
              htmlFor="reportTopic"
              className="text-sm font-medium text-gray-700"
            >
              Тема доклада и аннотация *
            </Label>
            <Input
              id="reportTopic"
              name="reportTopic"
              type="text"
              value={formData.reportTopic}
              onChange={handleInputChange}
              className={`${errors.reportTopic ? "border-red-500 focus:border-red-500" : "border-gray-300"}`}
              placeholder="Введите тему вашего доклада"
            />
            {errors.reportTopic && (
              <p className="text-sm text-red-600 mt-1">{errors.reportTopic}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="reportAnnotation"
              className="text-sm font-medium text-gray-700"
            >
              Аннотация доклада *
            </Label>
            <Textarea
              id="reportAnnotation"
              name="reportAnnotation"
              value={formData.reportAnnotation}
              onChange={handleInputChange}
              className={`${errors.reportAnnotation ? "border-red-500 focus:border-red-500" : "border-gray-300"} min-h-[100px]`}
              placeholder="Краткое описание вашего доклада"
            />
            {errors.reportAnnotation && (
              <p className="text-sm text-red-600 mt-1">
                {errors.reportAnnotation}
              </p>
            )}
          </div>

          {/* Файл */}
          <div className="space-y-2">
            <Label htmlFor="file" className="text-sm font-medium text-gray-700">
              Вы можете отправить доклад
            </Label>
            <Input
              id="file"
              name="file"
              type="file"
              onChange={handleFileChange}
              className="border-gray-300"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
            />
            <p className="text-xs text-gray-500">
              Поддерживаемые форматы: PDF, DOC, DOCX, PPT, PPTX
            </p>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
            >
              Послать
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={() => {
                setFormData({
                  firstName: "",
                  middleName: "",
                  lastName: "",
                  phone: "",
                  email: "",
                  gender: "",
                  sections: [],
                  city: "",
                  reportTopic: "",
                  reportAnnotation: "",
                });
                setErrors({});
              }}
            >
              Сброс
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConferenceForm;
