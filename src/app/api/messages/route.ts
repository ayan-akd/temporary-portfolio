"use server";

import dbConnect from "@/lib/database";
import { MessageModel } from "@/schemas/message.schema";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

const localEmail = process.env.EMAIL;
const password = process.env.EMAIL_Pass;


export async function GET() {
  try {
    await dbConnect();
    const messages = await MessageModel.find();
    return NextResponse.json({
      data: messages,
      message: "messages fetched successfully",
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Failed to fetch messages",
      status: 500,
      error: err,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const data = await request.json();
    const messageData = await MessageModel.create(data);
    const { name, email, message } = messageData;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: localEmail,
        pass: password,
      },
      debug: true,
    });

    const mailOptions = {
      from: email,
      to: localEmail,
      subject: ` New Contact From Portfolio by ${name}`,
      html: `<html>
      <body>
      <h4>Name: ${name}</h4>
      <h4>Email: ${email}</h4>
      <h4>Message: <p>${message}</p></h4>
      </body>
      </html>`,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json({
      data: messageData,
      message: "message created successfully",
      status: 201,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to create message",
      status: 500,
      error,
    });
  }
}
