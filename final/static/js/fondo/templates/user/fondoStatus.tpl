<div class="panel panel-default">
  <div class="panel-heading">
    <h4 class="panel-title">
      <a data-toggle="collapse" href="#collapseFondoStatus">
	Status
      </a>
    </h4>
  </div>
  <div id="collapseFondoStatus" class="panel-collapse collapse in">
    <p>Submited: <%= formatNumber.new(submited, 2, '$ ') %></p>
    <p>Aproved: <%= formatNumber.new(aproved, 2, '$ ') %></p>
  </div>
</div>
