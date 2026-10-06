import { schemaTitle } from "@/admin/schema";
import { LoginForm } from "@/components/admin/login-form";
import { Box } from "@/components/box";
import { Text } from "@/components/text";

export default function LoginPage() {
  return (
    <Box className="min-h-screen items-center justify-center bg-gray-50 p-4">
      <Box className="w-full max-w-sm flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <Box className="flex-col gap-1">
          <Text size="title" className="font-semibold tracking-tight text-gray-900">
            Entrar
          </Text>
          <Text size="caption" className="text-gray-500">
            {schemaTitle} · painel administrativo
          </Text>
        </Box>
        <LoginForm />
      </Box>
    </Box>
  );
}

export const getConfig = async () => {
  return { render: "dynamic" } as const;
};
