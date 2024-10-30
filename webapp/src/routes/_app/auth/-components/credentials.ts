import { config } from "@beta-lyfe/webapp/lib/config";

export const defaultValues = {
	signIn:
		config.app.environment === "development"
			? { email: "user@mail.com", password: "Sup3rS3cr3tPa$$w0rd" }
			: { email: "", password: "" },
};
