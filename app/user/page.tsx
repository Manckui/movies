"use client";

import { FormProvider, RHFTextField } from "@/components/form";
import { FrontOfficePage } from "@/components";
import { getAverageRating, useReviewsStore, useUserStore } from "@/hooks";
import { ROOT } from "@/routes/paths";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

interface IProfileFormValues {
  name: string;
  avatarUrl: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function User() {
  const { user, updateUser } = useUserStore();
  const { reviews } = useReviewsStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const methods = useForm<IProfileFormValues>({
    defaultValues: {
      name: user.name,
      avatarUrl: user.avatarUrl,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [avatarUrl, name] = useWatch({
    control: methods.control,
    name: ["avatarUrl", "name"],
  });

  const resetForm = () =>
    methods.reset({
      name: user.name,
      avatarUrl: user.avatarUrl,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  useEffect(() => {
    methods.reset({
      name: user.name,
      avatarUrl: user.avatarUrl,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }, [methods, user]);

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
    setShowSavedToast(true);

    methods.reset({
      name: data.name,
      avatarUrl: data.avatarUrl,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const breadcrumbItems = [{ text: "Home", link: ROOT }, { text: "Profilo" }];

  const passwordSlotProps = {
    input: {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton
            size="small"
            aria-label={showPasswords ? "Nascondi password" : "Mostra password"}
            onClick={() => setShowPasswords((prev) => !prev)}
          >
            {showPasswords ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </InputAdornment>
      ),
    },
  };
  const passwordType = showPasswords ? "text" : "password";

  const stats = [
    { label: "Recensioni", value: reviews.length },
    {
      label: "Voto medio",
      value: getAverageRating(reviews).toLocaleString("it-IT"),
    },
  ];

  return (
    <FrontOfficePage
      breadcrumbs={breadcrumbItems}
      title="Profilo"
      subtitle="Gestisci i dati del tuo account e la sicurezza."
    >
      <Snackbar
        open={showSavedToast}
        autoHideDuration={4000}
        onClose={() => setShowSavedToast(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Profilo aggiornato con successo
        </Alert>
      </Snackbar>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleAvatarChange}
      />

      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack gap={3}>
          {/* Copertina e riepilogo */}
          <Card sx={{ overflow: "hidden" }}>
            <Box
              sx={(theme) => ({
                height: 160,
                background: `linear-gradient(120deg, ${theme.palette.primary.dark} 0%, ${theme.palette.info.main} 55%, ${theme.palette.info.dark} 100%)`,
              })}
            />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "center", sm: "flex-end" }}
              gap={3}
              sx={{ px: 4, pb: 3, mt: "-56px" }}
            >
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={avatarUrl}
                  sx={{
                    width: 128,
                    height: 128,
                    border: 4,
                    borderColor: "background.paper",
                  }}
                />
                <IconButton
                  aria-label="Cambia foto profilo"
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    position: "absolute",
                    right: 4,
                    bottom: 6,
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    border: 3,
                    borderColor: "background.paper",
                    bgcolor: "primary.main",
                    color: "common.white",
                    "&:hover": { bgcolor: "primary.dark" },
                  }}
                >
                  <PhotoCameraIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Box>
              <Box sx={{ flex: 1, pb: 1, textAlign: { xs: "center", sm: "left" } }}>
                <Typography variant="h4">{name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Admin
                </Typography>
              </Box>
              <Stack direction="row" gap={4} sx={{ pb: 1 }}>
                {stats.map((stat) => (
                  <Stack key={stat.label} alignItems="center">
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Card>

          <Stack direction={{ xs: "column", md: "row" }} gap={3} alignItems="flex-start">
            {/* Dati account */}
            <Card sx={{ flex: 1, width: "100%", p: 3 }}>
              <Typography variant="h6">Dati account</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Nome visualizzato nella sidebar e nelle recensioni.
              </Typography>
              <RHFTextField
                name="name"
                label="Nome utente *"
                fullWidth
                rules={{ required: "Il nome è obbligatorio" }}
              />
            </Card>

            {/* Password */}
            <Card sx={{ flex: 1.4, width: "100%", p: 3 }}>
              <Typography variant="h6">Cambia password</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Lascia vuoti i campi se non vuoi modificarla.
              </Typography>
              <Stack gap={2.5}>
                <RHFTextField
                  name="currentPassword"
                  label="Password attuale"
                  type={passwordType}
                  fullWidth
                  slotProps={passwordSlotProps}
                />
                <Stack direction={{ xs: "column", sm: "row" }} gap={2}>
                  <RHFTextField
                    name="newPassword"
                    label="Nuova password"
                    type={passwordType}
                    fullWidth
                    helperText="Minimo 6 caratteri"
                    slotProps={passwordSlotProps}
                    rules={{
                      validate: (value) =>
                        !value || value.length >= 6 || "Minimo 6 caratteri",
                    }}
                  />
                  <RHFTextField
                    name="confirmPassword"
                    label="Conferma nuova password"
                    type={passwordType}
                    fullWidth
                    slotProps={passwordSlotProps}
                  />
                </Stack>
              </Stack>

              <Divider sx={{ my: 3, borderStyle: "dashed" }} />

              <Stack direction="row" justifyContent="flex-end" gap={1.5}>
                <Button variant="outlined" color="inherit" onClick={resetForm}>
                  Annulla
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={<CheckCircleIcon />}
                >
                  Salva modifiche
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Stack>
      </FormProvider>
    </FrontOfficePage>
  );
}
