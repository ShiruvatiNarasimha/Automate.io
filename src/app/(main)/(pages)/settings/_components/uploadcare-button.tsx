"use client";
import React, { useEffect, useRef } from "react";
import * as LR from "@uploadcare/blocks";
import { useRouter } from "next/navigation";

type Props = {
  onUpload: (e: string) => any;
};

LR.registerBlocks(LR);

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter();
  const ctxProviderRef = useRef<
    typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
  >(null);

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl);
      if (file) {
        router.refresh();
      }
    };

    if (ctxProviderRef.current) {
      ctxProviderRef.current.addEventListener(
        "file-upload-success",
        handleUpload
      );

      // Clean up the event listener when the component unmounts
      return () => {
        ctxProviderRef.current?.removeEventListener(
          "file-upload-success",
          handleUpload
        );
      };
    }
  }, [onUpload, router]);

  return (
    <div>
      <lr-config
        ctx-name="my-uploader"
        css-src={`${process.env.NEXT_PUBLIC_UPLOAD_CARE_CSS_SRC}${LR.PACKAGE_VERSION} ${process.env.NEXT_PUBLIC_UPLOAD_CARE_CSS_SRC}`}
      />
      <lr-upload-ctx-provider ref={ctxProviderRef} ctx-name="my-uploader" />
    </div>
  );
};

export default UploadCareButton;
