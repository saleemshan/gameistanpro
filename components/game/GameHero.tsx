import Image from "next/image";
import { RatingStars } from "./RatingStars";
import { VersionBadge } from "./VersionBadge";
import { DownloadButton } from "./DownloadButton";
import { ShareButtons } from "./ShareButtons";
import { Download, HardDrive, Smartphone } from "lucide-react";
import type { Game } from "@/lib/games";
import { BASE_URL } from "@/lib/seo";

interface GameHeroProps {
  game: Game;
}

export function GameHero({ game }: GameHeroProps) {
  const shareUrl = `${BASE_URL}/${game.slug}`;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-muted md:h-32 md:w-32">
          {game.iconUrl ? (
            <Image
              src={game.iconUrl}
              alt={`${game.title} APK download icon`}
              fill
              className="object-cover"
              sizes="128px"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center gradient-primary text-4xl font-bold text-white">
              {game.title.charAt(0)}
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading text-2xl font-bold md:text-3xl">
              {game.title}
            </h1>
            <VersionBadge
              isNew={game.isNew}
              isUpdated={game.isUpdated}
              isFeatured={game.isFeatured}
            />
          </div>

          <RatingStars
            rating={Number(game.rating) || 0}
            votes={game.totalVotes || 0}
            size="md"
          />

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Download className="h-4 w-4" />
              {(game.downloadCount || 0).toLocaleString()} downloads
            </span>
            <span className="flex items-center gap-1.5">
              <HardDrive className="h-4 w-4" />
              {game.fileSize}
            </span>
            <span className="flex items-center gap-1.5">
              <Smartphone className="h-4 w-4" />
              {game.osRequirements}
            </span>
          </div>

          {game.version && (
            <p className="text-sm text-muted-foreground">
              Version: <span className="font-mono text-primary">{game.version}</span>
            </p>
          )}

          <div className="pt-2">
            <ShareButtons url={shareUrl} title={game.seoTitle || game.title} />
          </div>
        </div>

        <div className="hidden w-56 shrink-0 md:block">
          {game.downloadUrl && (
            <DownloadButton url={game.downloadUrl} gameName={game.title} />
          )}
        </div>
      </div>
    </div>
  );
}
