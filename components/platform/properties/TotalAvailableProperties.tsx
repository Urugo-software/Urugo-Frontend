function TotalAvailableProperties({ total }: { total?: number }) {
  return (
    <span className="text-[14px] text-body tracking-wide">
      <b className="text-ink ml-1">{total}</b> verified properties available
    </span>
  );
}

export default TotalAvailableProperties;
