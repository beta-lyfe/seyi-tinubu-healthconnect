import type { FunctionComponent, PropsWithChildren } from "react";

export namespace AuthLayout {
	export const Container: FunctionComponent<PropsWithChildren> = ({
		children,
	}) => (
		<div className="h-screen grid grid-cols-12">
			<div className="col-span-6 bg-primary" />
			<div className="col-span-6">{children}</div>
		</div>
	);
}
