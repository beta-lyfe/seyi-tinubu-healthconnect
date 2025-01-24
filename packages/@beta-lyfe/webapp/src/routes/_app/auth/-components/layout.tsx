import type { FunctionComponent, PropsWithChildren } from "react";

export namespace AuthLayout {
	export const Container: FunctionComponent<PropsWithChildren> = ({
		children,
	}) => (
		<div className="h-screen grid grid-cols-12">
			<div className="lg:col-span-6 bg-primary hidden lg:block col-span-0" />
			<div className="col-span-12 lg:col-span-6">{children}</div>
		</div>
	);
}
