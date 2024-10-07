import { Button } from "@beta-lyfe/webapp/components/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	Loader2Icon,
	LockIcon,
	MicIcon,
	SpeakerIcon,
	VideoIcon,
	Volume2Icon,
	VolumeIcon,
} from "lucide-react";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_app/_consultation/consultations/")({
	component: ConsultationPage,
});

const useGetUserMedia = () =>
	useMutation({
		mutationFn: async () => {
			try {
				return await window.navigator.mediaDevices.getUserMedia({
					video: { facingMode: "user" },
					audio: true,
				});
			} catch (err) {
				// TODO: do proper reserarch on what error (s) this could be
				throw new Error("Failed to get user media");
			}
		},
	});

const LoadingScreen = () => (
	<div className="flex flex-col grow items-center justify-center">
		<Loader2Icon className="animate-spin size-12 stroke-primary" />
	</div>
);

const PermissionsScreen: FunctionComponent<{
	onGrantPermissions: (ms: MediaStream) => void;
}> = ({ onGrantPermissions }) => {
	const { mutate } = useGetUserMedia();
	const requestPermissions = () =>
		mutate(undefined, {
			onSuccess: (ms) => {
				onGrantPermissions(ms);
			},
			onError: (err) => {
				// TODO: better UX for error message?
				toast.error(err.message);
			},
		});

	return (
		<div className="flex flex-col grow items-center justify-between p-5">
			<div />
			<div className="flex flex-col items-center gap-4">
				<div className="p-6 rounded-full bg-gray-200">
					<LockIcon className="size-12 stroke-black" />
				</div>
				<div className="space-y-2">
					<h1 className="text-2xl text-center font-bold">Enable permissions</h1>
					<p className="text-center">Just a few things before you join</p>
				</div>
			</div>
			<div className="w-full">
				<Button className="w-full" onClick={() => requestPermissions()}>
					Grant Permissions
				</Button>
			</div>
		</div>
	);
};

const ErrorScreen = () => (
	<div className="flex flex-col grow items-center justify-center">
		<h1 className="text-2xl font-bold">An error occurred</h1>
	</div>
);

const ConsultationScreen: FunctionComponent<{ mediaStream: MediaStream }> = ({
	mediaStream,
}) => {
	const videoRef = useRef<HTMLVideoElement>(null);
	useEffect(() => {
		const _video = videoRef.current;
		if (_video === null) return;
		_video.srcObject = mediaStream;
	}, [mediaStream]);

	return (
		<div className="relative grow">
			<div className="absolute top-0 w-full p-5 bg-gradient-to-b from-black to-transparent flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-bold text-white text-center">
						Getting ready to join in
					</h1>
					<p className="text-white text-sm text-center">
						Setup your audio and video before joining
					</p>
				</div>
				<div className="flex justify-center gap-4">
					<div className="bg-red-500 text-white flex gap-2 rounded-full px-2 py-1 items-center">
						<span className="h-4 aspect-square rounded-full bg-white" />
						<span className="font-medium">LIVE</span>
					</div>
					<div className="bg-slate-800 text-white flex gap-2 rounded-full px-4 py-2 items-center">
						<span className="font-medium">1 other in session</span>
					</div>
				</div>
			</div>
			<video className="w-full h-full object-cover" autoPlay ref={videoRef} />
			<div className="absolute bottom-0 bg-slate-800 rounded-t-xl p-5 w-full">
				<div className="flex flex-col gap-4">
					<div className="flex gap-4 justify-between">
						<div className="flex items-center gap-4">
							<button className="p-3 rounded-md border-slate-600 border">
								<MicIcon className="size-6 stroke-white" />
							</button>
							<button className="p-3 rounded-md border-slate-600 border">
								<VideoIcon className="size-6 stroke-white" />
							</button>
						</div>
						<div>
							<button className="p-3 rounded-md border-slate-600 border">
								<Volume2Icon className="size-6 stroke-white" />
							</button>
						</div>
					</div>
					<div>
						<Button className="w-full" onClick={() => {}}>
							Join Now
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

function ConsultationPage() {
	const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

	if (mediaStream === null)
		return <PermissionsScreen onGrantPermissions={setMediaStream} />;

	return <ConsultationScreen mediaStream={mediaStream} />;
}
