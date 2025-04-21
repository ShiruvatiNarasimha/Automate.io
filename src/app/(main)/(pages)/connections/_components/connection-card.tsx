import { ConnectionTypes } from "@/lib/types";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

type Props = {
  type: ConnectionTypes;
  icon: string;
  title: ConnectionTypes;
  description: string;
  callback?: () => void;
  connected: {} & any;
};

const ConnectionCard = ({
  description,
  type,
  icon,
  title,
  connected,
}: Props) => {
  return (
        <div>
        </div>
            Connected
        ) : (
          <Link
            href={
              title == "Discord"
                ? process.env.NEXT_PUBLIC_DISCORD_REDIRECT!
                : title == "Notion"
                ? process.env.NEXT_PUBLIC_NOTION_AUTH_URL!
                : title == "Slack"
                ? process.env.NEXT_PUBLIC_SLACK_REDIRECT!
                : "#"
            }
          >
          </Link>
        )}
      </div>
    </Card>
  );
};

export default ConnectionCard;
