export function OperationsSummary({ waiting, dispatched, available, pendingReports, missed }: { waiting: number; dispatched: number; available: number; pendingReports: number; missed: number }) {
  return <section className="opsSummary" aria-label="Resumo operacional">
    <div><span className="summaryDot urgent" /><small>AGUARDANDO</small><strong>{waiting}</strong></div>
    <div><span className="summaryDot field" /><small>EM CAMPO</small><strong>{dispatched}</strong></div>
    <div><span className="summaryDot available" /><small>DISPONÍVEIS</small><strong>{available}/7</strong></div>
    <div><span className="summaryDot result" /><small>RESULTADOS</small><strong>{pendingReports}</strong></div>
    <div><span className="summaryDot missed" /><small>NÃO ATENDIDAS</small><strong>{missed}</strong></div>
  </section>;
}
