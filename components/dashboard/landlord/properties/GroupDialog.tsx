import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog } from "@base-ui/react/dialog";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import type { PropertyGroup } from "@/types/landlord";
import { readImageFile } from "@/utils/image-file";
import type { GroupAction } from "./GroupCard";

export type GroupDialogRequest =
  | { kind: "create" }
  | { kind: GroupAction; group: PropertyGroup };

interface GroupFields {
  name: string;
  location: string;
  cover: FileList;
}

const titles = {
  create: "Create Group",
  rename: "Rename group",
  cover: "Change cover image",
  delete: "Delete group?",
};

export function GroupDialog({
  request,
  onClose,
  onCreated,
  onDeleted,
  returnFocusId,
}: {
  request: GroupDialogRequest;
  onClose: () => void;
  onCreated?: (group: PropertyGroup) => void;
  onDeleted?: () => void;
  returnFocusId?: string;
}) {
  const { createGroup, updateGroup, deleteGroup } = useLandlordProperties();
  const group = request.kind === "create" ? undefined : request.group;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<GroupFields>({
    defaultValues: { name: group?.name ?? "", location: group?.location ?? "" },
  });
  const { kind } = request;
  const Modal = kind === "delete" ? AlertDialog : Dialog;

  async function submit(fields: GroupFields) {
    let coverImage: string | undefined;
    if (fields.cover?.[0]) {
      try {
        coverImage = await readImageFile(fields.cover[0]);
      } catch {
        setError("cover", {
          message: "This image could not be read. Choose it again.",
        });
        return;
      }
    }
    if (request.kind === "create") {
      const created = createGroup({
        name: fields.name.trim(),
        location: fields.location.trim() || undefined,
        coverImage,
      });
      toast.success(`Group "${created.name}" created.`);
      onCreated?.(created);
    } else if (request.kind === "rename") {
      updateGroup(request.group.id, {
        name: fields.name.trim(),
        location: fields.location.trim() || undefined,
      });
      toast.success("Group details updated.");
    } else if (request.kind === "cover") {
      updateGroup(request.group.id, { coverImage });
      toast.success("Group cover image updated.");
    }
    onClose();
  }

  return (
    <Modal.Root
      open
      onOpenChange={(open) => {
        if (!open && !isSubmitting) onClose();
      }}
    >
      <Modal.Portal>
        <Modal.Backdrop className="fixed inset-0 z-50 bg-black/40" />
        <Modal.Popup
          finalFocus={() =>
            (returnFocusId && document.getElementById(returnFocusId)) ||
            document.getElementById("portfolio-title") ||
            true
          }
          className="fixed left-1/2 top-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 space-y-5 overflow-y-auto rounded-none border border-line bg-white p-5 shadow-lg"
        >
          <Modal.Title className="text-xl font-semibold text-ink">
            {titles[kind]}
          </Modal.Title>
          {request.kind === "delete" ? (
            <>
              <Modal.Description className="text-sm text-body">
                Delete “{request.group.name}”? Its properties will become
                ungrouped. All properties, units, renters, tenancy history,
                agreements and payments will be kept.
              </Modal.Description>
              <div className="flex justify-end gap-2">
                <Button variant="outline" className="rounded-none" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  className="rounded-none"
                  onClick={() => {
                    const name = request.group.name;
                    deleteGroup(request.group.id);
                    toast.success(`Group "${name}" deleted.`);
                    onClose();
                    onDeleted?.();
                  }}
                >
                  Delete Group
                </Button>
              </div>
            </>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit(submit)}
              className="space-y-4"
            >
              {kind !== "cover" && (
                <Field>
                  <FieldLabel htmlFor="group-name">Group name</FieldLabel>
                  <Input
                    id="group-name"
                    className="rounded-none"
                    aria-required
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name && "group-name-error"}
                    {...register("name", {
                      validate: (value) =>
                        !!value.trim() || "Enter a group name.",
                    })}
                  />
                  <FieldError id="group-name-error">
                    {errors.name?.message}
                  </FieldError>
                </Field>
              )}
              {(kind === "create" || kind === "rename") && (
                <Field>
                  <FieldLabel htmlFor="group-location">
                    Location (optional)
                  </FieldLabel>
                  <Input id="group-location" className="rounded-none" {...register("location")} />
                </Field>
              )}
              {kind !== "rename" && (
                <Field>
                  <FieldLabel htmlFor="group-cover">
                    Cover image{kind === "create" && " (optional)"}
                  </FieldLabel>
                  <Input
                    id="group-cover"
                    type="file"
                    accept="image/*"
                    className="rounded-none"
                    aria-invalid={!!errors.cover}
                    aria-describedby={errors.cover && "group-cover-error"}
                    {...register("cover", {
                      validate: (files) => {
                        if (!files?.length)
                          return kind === "create" || "Choose a cover image.";
                        return (
                          files[0].type.startsWith("image/") ||
                          "Choose an image file."
                        );
                      },
                    })}
                  />
                  <FieldError id="group-cover-error">
                    {errors.cover?.message}
                  </FieldError>
                  {kind === "cover" && group?.coverImage && (
                    <Button
                      type="button"
                      variant="link"
                      className="w-fit px-0"
                      disabled={isSubmitting}
                      onClick={() => {
                        updateGroup(group.id, { coverImage: undefined });
                        onClose();
                      }}
                    >
                      Remove current cover
                    </Button>
                  )}
                </Field>
              )}
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-none "
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-none "
                  disabled={isSubmitting}
                >
                  {kind === "create" ? "Create Group" : "Apply changes"}
                </Button>
              </div>
            </form>
          )}
        </Modal.Popup>
      </Modal.Portal>
    </Modal.Root>
  );
}
