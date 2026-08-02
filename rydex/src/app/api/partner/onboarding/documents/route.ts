import { auth } from "@/auth";
import uploadOnCloudinary from "@/lib/cloudinary";
import connectDb from "@/lib/db";
import PartnerDocs from "@/models/partnerDocs.model";
import User from "@/models/user.model";
import Vehicle from "@/models/vehicle.model";

import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        console.log("===== DOCUMENT UPLOAD STARTED =====");

        await connectDb()
        const session = await auth()
        if (!session || !session.user?.email) {
            return Response.json({ message: "unauthorized" }
                , { status: 400 }
            )
        }

        const user = await User.findOne({ email: session.user.email })
        console.log("User:", user?._id);
        if (!user) {
            return Response.json({ message: "user not found" }
                , { status: 400 }
            )
        }

        const formdata = await req.formData()
        console.log("FormData received");
        const aadhar = formdata.get("aadhar") as Blob | null
        const license = formdata.get("license") as Blob | null
        const rc = formdata.get("rc") as Blob | null
        console.log({
            aadhar: !!aadhar,
            license: !!license,
            rc: !!rc
        });

        if (!aadhar || !license || !rc) {
            return Response.json({ message: "all documents are required" }
                , { status: 400 }
            )
        }
        const updatePayload: any = {
            owner: user._id,
            status: "pending"
        }

        if (aadhar) {
            const url = await uploadOnCloudinary(aadhar)
            console.log("Aadhar URL:", url);
            if (!url) {
                return Response.json({ message: "aadhar upload failed" }
                    , { status: 500 }
                )
            }
            updatePayload.aadharUrl = url
        }
        if (license) {
            const url = await uploadOnCloudinary(license)
            console.log("License URL:", url);
            if (!url) {
                return Response.json({ message: "license upload failed" }
                    , { status: 500 }
                )
            }
            updatePayload.licenseUrl = url
        }
        if (rc) {
            const url = await uploadOnCloudinary(rc)
            console.log("RC URL:", url);
            if (!url) {
                return Response.json({ message: "rc upload failed" }
                    , { status: 500 }
                )
            }
            updatePayload.rcUrl = url
        }
        console.log("Saving PartnerDocs...", updatePayload);

        const partnerDocs = await PartnerDocs.findOneAndUpdate(
            { owner: user._id },
            { $set: updatePayload },
            { upsert: true, new: true }
        )
        console.log("PartnerDocs Saved:", partnerDocs);

        if (user.partnerOnBoardingSteps < 2) {
            user.partnerOnBoardingSteps = 2
        } else {
            user.partnerOnBoardingSteps = 3
        }
        user.partnerStatus = "pending"

        await user.save()

        return Response.json(
            partnerDocs, { status: 201 }
        )

    } catch (error) {


        console.error("PartnerDocs Upload Error:", error);

        return Response.json(
            { message: `partner docs error ${error}` },
            { status: 500 }
        );
    }
}


