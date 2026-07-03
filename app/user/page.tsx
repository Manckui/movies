"use client";

import { FormProvider, RHFTextField } from "@/components/form";
import { FrontOfficePage } from "@/components";
import { useUserStore } from "@/hooks";
import { ROOT } from "@/routes/paths";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

interface IProfileFormValues {
  name: string;
  avatarUrl: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function User() {
  const theme = useTheme();
  const { user, updateUser } = useUserStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const methods = useForm<IProfileFormValues>({
    defaultValues: {
      name: user.name,
      avatarUrl: user.avatarUrl,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const avatarUrl = methods.watch("avatarUrl");
  const name = methods.watch("name");

  useEffect(() => {
    methods.reset({
      name: user.name,
      avatarUrl: user.avatarUrl,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () =>
      methods.setValue("avatarUrl", reader.result as string, {
        shouldDirty: true,
      });
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: IProfileFormValues) => {
    if (data.newPassword && data.newPassword !== data.confirmPassword) {
      methods.setError("confirmPassword", {
        message: "Le password non coincidono",
      });
      return;
    }

    updateUser({ name: data.name, avatarUrl: data.avatarUrl });

    if (data.newPassword) {
      console.log("password change requested:", {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
    }

    methods.reset({
      name: data.name,
      avatarUrl: data.avatarUrl,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const breadcrumbItems = [{ text: "Home", link: ROOT }, { text: "Profilo" }];

  const cardSx = {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 3,
    p: 4,
  };

  return (
    <FrontOfficePage breadcrumbs={breadcrumbItems} title="Profilo">
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          gap={3}
          alignItems="stretch"
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            gap={2}
            sx={{ ...cardSx, flex: 1, textAlign: "center" }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={avatarUrl}
                sx={{
                  width: 140,
                  height: 140,
                }}
              />
              <IconButton
                onClick={() => fileInputRef.current?.click()}
                sx={{
                  position: "absolute",
                  right: 4,
                  bottom: 4,
                  backgroundColor: "background.paper",
                  boxShadow: 2,
                }}
              >
                <PhotoCameraIcon fontSize="small" />
              </IconButton>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleAvatarChange}
              />
            </Box>
            <Typography variant="h5">{name}</Typography>
          </Stack>

          <Stack gap={4} sx={{ ...cardSx, flex: 2 }}>
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Dati Account
              </Typography>
              <RHFTextField
                name="name"
                label="Nome Utente"
                fullWidth
                rules={{ required: "Il nome è obbligatorio" }}
              />
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Cambia Password
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
                <RHFTextField
                  name="currentPassword"
                  label="Password Attuale"
                  type="password"
                  fullWidth
                />
                <RHFTextField
                  name="newPassword"
                  label="Nuova Password"
                  type="password"
                  fullWidth
                />
                <RHFTextField
                  name="confirmPassword"
                  label="Conferma Nuova Password"
                  type="password"
                  fullWidth
                />
              </Stack>
            </Box>

            <Stack direction="row" justifyContent="flex-end">
              <Button type="submit" variant="contained" color="success">
                Salva Modifiche
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </FormProvider>
    </FrontOfficePage>
  );
}
