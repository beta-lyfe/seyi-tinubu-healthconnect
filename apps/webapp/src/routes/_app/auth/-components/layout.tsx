import type { FunctionComponent, PropsWithChildren } from 'react'

export namespace AuthLayout {
  export const Container: FunctionComponent<PropsWithChildren> = ({
    children
  }) => (
    <div className="h-screen grid grid-cols-12">
      <div className="lg:col-span-6 bg-primary hidden lg:block col-span-0 border-2 rounded-tr-[50px] border-black" />
      <div className="col-span-12 lg:col-span-6 h-full">
        <div className="max-w-xl mx-auto h-full py-10 p-6">{children}</div>
      </div>
    </div>
  )
}
