<template>
	<main style="background-color: white">
		<section class="pt-0"></section>
		<section class="pt-0">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<div class="card bg-light p-0 pb-0" style="background-color: #f5f5f6">
							<div class="card-body d-flex justify-content-between flex-wrap"
								style="text-align: left; background-color: #f5f5f6">
								<div>
									<!-- ss -->
									<h1 class="h3 mt-2 mb-1">{{ temple.name }}</h1>
									<p class="mb-3 mb-sm-0">
										<i class="bi bi-geo-alt me-1 text-primary"></i>
										{{ temple.address }}
									</p>
									<!--  -->
									<carousel :items-to-show="isMobileView ? 1 : 3" autoplay="4000" transition="500"
										style="padding-bottom: 0%">
										<slide v-for="(image, key) in temple.images" :key="key">
											<div class="container">
												<div class="row">
													<div class="col-md">
														<div style="align-items: baseline">
															<img style="
                                  max-width: 200px;
                                  max-height: fit-content;
                                  align-items: flex-start;
                                " :src="image.image" class="temple card-img" alt="" />
														</div>
													</div>
												</div>
											</div>
										</slide>
									</carousel>
									<!--  -->
								</div>
							</div>
							<!--  -->
							<div class="card-footer bg-transparent border-top py-0" style="background-color: white">
								<ul class="nav nav-tabs nav-bottom-line nav-responsive border-0" role="tablist">
									<li class="nav-item" @click="setTabNo(4)">
										<a class="nav-link mb-0 active" data-bs-toggle="tab" href="#tab-4">Prasadam</a>
									</li>
									<li class="nav-item" @click="setTabNo(2)">
										<a class="nav-link mb-0" data-bs-toggle="tab" href="#tab-2">Pujas</a>
									</li>
									<li class="nav-item">
										<a class="nav-link mb-0" data-bs-toggle="tab" href="#tab-3">e-Services</a>
									</li>
									<li class="nav-item">
										<a class="nav-link mb-0" data-bs-toggle="tab" href="#tab-1">About Temple</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="pt-0">
			<div class="container">
				<div class="tab-content mb-0" id="tour-pills-tabContent">
					<div class="tab-pane fade" id="tab-1" role="tabpanel" aria-labelledby="tab-1">
						<div class="row g-4 g-lg-5">
							<div class="col-lg-7 col-xl-8">
								<div class="card mb-4">
									<div class="card-header border-bottom px-0 pt-0" style="background-color: #fff;">
										<h4 class="mb-0">Description</h4>
									</div>
									<div class="card-body px-0 pb-0">
										<p class="mb-3">{{ temple.details }}</p>
									</div>
								</div>
								<!-- Card END -->

								<!-- Card START -->
								<div class="card">
									<!-- Card header -->
									<div class="card-header border-bottom px-0">
										<h4 class="mb-0">Image Gallery</h4>
									</div>
									<!-- Card body -->
									<div class="card-body px-0 pb-0">
										<div class="row g-4">
											<div class="col-md-4" v-for="(image, key) in temple.images" :key="key">
												<a class="w-100 h-100">
													<div class="card overflow-hidden">
														<img :src="image.image" class="temple card-img" alt="" />
													</div>
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="col-lg-5 col-xl-4">
								<div class="card shadow">
									<div class="card-header border-bottom">
										<h5 class="mb-0">Get Direction</h5>
									</div>
									<div class="card-body">
										<ul class="list-group list-group-borderless mb-0">
											<li class="list-group-item d-flex justify-content-between">
												<span>Taluk</span>
												<span>{{ temple.taluk }}</span>
											</li>

											<li class="list-group-item py-0">
												<hr class="my-1" />
											</li>

											<li class="list-group-item d-flex justify-content-between">
												<span>District</span>
												<span>{{ temple.district }}</span>
											</li>

											<li class="list-group-item py-0">
												<hr class="my-1" />
											</li>

											<li class="list-group-item d-flex justify-content-between">
												<span>Area</span>
												<span>{{ temple.area }}</span>
											</li>

											<li class="list-group-item py-0">
												<hr class="my-1" />
											</li>

											<li class="list-group-item d-flex justify-content-between">
												<span>City</span>
												<span>{{ temple.city }}</span>
											</li>

											<li class="list-group-item py-0">
												<hr class="my-1" />
											</li>

											<li class="list-group-item d-flex justify-content-between">
												<span>State</span>
												<span>{{ temple.state }}</span>
											</li>

											<li class="list-group-item py-0">
												<hr class="my-1" />
											</li>

											<li class="list-group-item d-flex justify-content-between">
												<span>Pincode</span>
												<span>{{ temple?.pincode }}</span>
											</li>

											<li class="list-group-item py-0">
												<hr class="my-1" />
											</li>

											<li class="list-group-item d-flex justify-content-between">
												<span>Website</span>
												<span>{{ temple.website }}</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="tab-pane fade" id="tab-2" role="tabpanel" aria-labelledby="tab-2">
						<!--  -->
						<!-- <div
							class="bg-blur bg-white bg-opacity-10 border border-light border-opacity-25 rounded-3 mb-4">
							<div class="row g-3 justify-content-center align-items-center">
								<div class="col-lg">
									<div class="form-input-dropdown position-relative">
										<input v-model="search" placeholder="Search for Pooja"
											class="form-control form-control-lg me-1 ps-5" @keyup.enter="getPoojas"
											type="text" />
									</div>
								</div>

								<div class="col-lg-2 d-grid">
									<a class="btn btn-lg btn-primary mb-0" href="#"
										@click.prevent="getPoojas">Search</a>
								</div>
							</div>
						</div> -->

						<!--  -->
						<div class="row g-4">
							<div class="col-sm-6 col-lg-4 col-xl-3" v-for="(pooja, key) in poojas" :key="pooja.id || key">
								<a class="card shadow h-100">
									<div class="card-body">
										<ul class="list-group list-group-borderless mb-0" style="text-align: left">
											<li class="list-group-item small pb-0">
												<h5 style="color: #040404">🌸{{ pooja.name }}</h5>
											</li>
											<li class="list-group-item" v-if="pooja.images && pooja.images.length">
												<img :src="pooja.images[0] ? pooja.images[0].image : pooja.image" alt=""
													style="border: 5px solid #ef5b0c; padding: 2px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
											</li>
											<li class="list-group-item small pb-0">
												<h6 style="margin: inherit; color: #ef5b0c">
													Details:
												</h6>
												{{ pooja.details }}
											</li>
											<li class="list-group-item small pb-0">
												<h6 style="margin: inherit; color: #ef5b0c">
													Include's:
												</h6>
												<span class="me-2" v-html="pooja.included"></span>
											</li>
											<li class="list-group-item small pb-0">
												<h6 style="margin: inherit; color: #ef5b0c">
													Benefits:
												</h6>
												<span class="me-2" v-html="pooja.excluded"></span>
											</li>
											<li class="list-group-item small pb-0">
												<h6 style="margin: inherit; color: #ef5b0c">Cost:</h6>
												₹ {{ pooja.original_cost }}/-
											</li>
										</ul>
									</div>
									<div class="card-footer">
										<div>
											<div class="mt-2 mt-sm-0" v-if="temple.pujari.length != 0">
												<button @click="bookPooja(pooja)"
													class="button btn btn-sm btn-primary mb-0">
													Participate
													<i class="fa fa-arrow-right pl-2 text-light my-auto"
														style="position: relative; font-size: 16px"
														aria-hidden="true"></i>
												</button>
											</div>
											<div class="mt-2 mt-sm-0" v-else>
												<button @click="requestPooja(pooja)" style="width: 100%"
													class="button btn btn-sm btn-primary mb-0">
													<i class="bi bi-plus-lg"></i> Request for Pooja
												</button>
											</div>
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
					<div class="tab-pane fade" id="tab-3" role="tabpanel" aria-labelledby="tab-2">
						<h4>Coming Soon!...</h4>
					</div>
					<div class="tab-pane fade show active" id="tab-4" role="tabpanel" aria-labelledby="tab-4">
						<!--  -->
						<!-- <div
							class="bg-blur bg-white bg-opacity-10 border border-light border-opacity-25 rounded-3 mb-4">
							<div class="row g-3 justify-content-center align-items-center">
								<div class="col-lg">
									<div class="form-input-dropdown position-relative">
										<input v-model="search" placeholder="Search for Pooja"
											class="form-control form-control-lg me-1 ps-5" @keyup.enter="getPoojas"
											type="text" />
									</div>
								</div>

								<div class="col-lg-2 d-grid">
									<a class="btn btn-lg btn-primary mb-0" href="#"
										@click.prevent="getPoojas">Search</a>
								</div>
							</div>
						</div> -->

						<!--  -->
						<div class="row g-4">
							<!--  -->
							              <div class="col-sm-6 col-lg-4 col-xl-3" v-for="(pooja, key) in prasads" :key="pooja.id || key">
															<a class="card shadow h-100">
																<div class="card-body">
																	<ul class="list-group list-group-borderless mb-0" style="text-align: left">
																		<li class="list-group-item small pb-0">
																			<h5 style="color: #040404">🌸{{ pooja.pooja_prasadam?.name || pooja.name }}</h5>
																		</li>
																		<li class="list-group-item" v-if="getPoojaImage(pooja)">
																			<img :src="getPoojaImage(pooja)" alt="" style="border: 5px solid #ef5b0c; padding: 2px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);">
																		</li>
																		<li class="list-group-item small pb-0">
																			<h6 style="margin: inherit; color: #ef5b0c">
																				Details:
																			</h6>
																			{{ pooja.pooja_prasadam?.details || pooja.details }}
																		</li>
																		<li class="list-group-item small pb-0">
																			<h6 style="margin: inherit; color: #ef5b0c">
																				Include's:
																			</h6>
																			<span class="me-2" v-html="pooja.pooja_prasadam?.included || pooja.included || pooja.includes"></span>
																		</li>
																		<li class="list-group-item small pb-0">
																			<h6 style="margin: inherit; color: #ef5b0c">
																				Benefits:
																			</h6>
																			<span class="me-2" v-html="pooja.pooja_prasadam?.excluded || pooja.excluded || pooja.benefits"></span>
																		</li>
																		<li class="list-group-item small pb-0">
																			<h6 style="margin: inherit; color: #ef5b0c">Cost:</h6>
																			₹ {{ pooja.pooja_prasadam?.original_cost || pooja.pooja_prasadam?.final_total || pooja.original_cost || pooja.cost || pooja.price || pooja.final_total }}/-
																		</li>
																	</ul>
									</div>
									<div class="card-footer">
										<div>
											<div class="mt-2 mt-sm-0" v-if="temple.pujari.length != 0">
												<button @click="bookPooja(pooja)"
													class="button btn btn-sm btn-primary mb-0">
													Participate
													<i class="fa fa-arrow-right pl-2 text-light my-auto"
														style="position: relative; font-size: 16px"
														aria-hidden="true"></i>
												</button>
											</div>
											<div class="mt-2 mt-sm-0" v-else>
												<button @click="requestPooja(pooja)" style="width: 100%"
													class="button btn btn-sm btn-primary mb-0">
													<i class="bi bi-plus-lg"></i> Request for Pooja
												</button>
											</div>
										</div>
									</div>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</main>
	<dialog id="payment" class="dialtag">
		<div v-if="request">
			<div class="card shadow mb-4">
				<div class="card-header border-bottom">
					<div style="float: right">
						<i class="fas fa-times-circle" style="font-size: 20px; color: rgb(255, 0, 0)"
							v-on:click="close()"></i>
					</div>
					<h5 class="mb-0">Booking Details</h5>
				</div>
				<div class="card-body" style="text-align: left">
					<div class="row">
						<div class="col-sm-6 mb-3">
							<label class="form-label">Puja / Prasad Name <span class="text-red">*</span></label>
							<input type="text" v-model="booking.pooja_name" class="form-control"
								placeholder="Pooja Name" disabled />
						</div>
						<div class="col-sm-6 mb-3">
							<label class="form-label">Booking Date <span class="text-red">*</span></label>
							<VueDatePicker placeholder="Select your puja date" v-model="booking.booking_date"
								:format="'dd/MM/yyyy'" :class="{ 'is-invalid': error.booking_date != '' }" auto-apply
								:min-date="twoDaysFromNow" :enable-time-picker="false"
								:start-date="twoDaysFromNow" focus-start-date :disabled="!request"></VueDatePicker>
							<small><span v-if="error.booking_date != ''" class="text-danger">{{ error.booking_date
									}}</span></small>
						</div>
						<div class="col-sm-6 mb-3">
							<label class="form-label">Devotee Name <span class="text-red">*</span></label>
							<input type="text" id="devotee_name" v-model.trim="booking.name" class="form-control"
								placeholder="Devotee Name" :class="{ 'is-invalid': error.name != '' }"
								:disabled="!request" />
							<span v-if="error.name != ''" class="invalid-feedback">{{ error.name }}</span>
						</div>
						<div class="col-sm-6 mb-3">
							<label class="form-label">Devotee Mobile Number
								<span class="text-red">*</span></label>
							<input type="text" v-model="booking.mobile_no" class="form-control"
								placeholder="Devotee Mobile Number" :class="{ 'is-invalid': error.mobile_no != '' }"
								:disabled="!request" @input="validateMobileNumber" />
							<span v-if="error.mobile_no != ''" class="invalid-feedback">{{ error.mobile_no }}</span>
						</div>
					</div>
					<div class="row" v-if="tab_no == 2">
						<div class="col-sm-6 mb-3">
							<label class="form-label">Rashi</label>
							<textarea v-model="booking.rashi" class="form-control" placeholder="Rashi"
								:disabled="!request"></textarea>
						</div>
						<div class="col-sm-6 mb-3">
							<label class="form-label">Nakshatra</label>
							<textarea v-model="booking.nakshatra" class="form-control" placeholder="Nakshatra"
								:disabled="!request"></textarea>
						</div>
						<div class="col-sm-6 mb-3">
							<label class="form-label">Gotra</label>
							<textarea v-model="booking.gotra" class="form-control" placeholder="Gotra"
								:disabled="!request"></textarea>
						</div>
						<div class="col-sm-6 mb-3">
							<label class="form-label">Sankalpa</label>
							<textarea v-model="booking.comment" class="form-control" placeholder="Sankalpa"
								:disabled="!request"></textarea>
						</div>
					</div>
					<div class="row" v-show="booking.prasad_delivery && tab_no == 2">
						<div class="mb-3">
							<label for="prasadam">
								<input id="prasadam" v-model="booking.prasadam" type="checkbox"
									style="vertical-align: middle" :disabled="!request" />
								Do you want Prasadam ?</label>
						</div>
						<div class="col-sm-4 mb-3" v-show="this.booking.prasadam">
							<label class="form-label">Street Address 1<span class="text-red">*</span></label>
							<input type="text" id="address" v-model="booking.prasadam_address.street_address_1"
								class="form-control" placeholder="Address"
								:class="{ 'is-invalid': error.address_1 != '' }" />
							<span v-if="error.address_1 != ''" class="invalid-feedback">{{ error.address_1 }}</span>
						</div>
						<div class="col-sm-4 mb-3" v-show="this.booking.prasadam">
							<label class="form-label">Street Address 2</label>
							<input type="text" id="address" v-model="booking.prasadam_address.street_address_2"
								class="form-control" placeholder="Address" />
						</div>
						<div class="col-sm-4 mb-3" v-show="this.booking.prasadam">
							<label class="form-label">City/Town/Village <span class="text-red">*</span></label>
							<input type="text" id="city" v-model="booking.prasadam_address.city" class="form-control"
								placeholder="City/Town/Village" :class="{ 'is-invalid': error.city != '' }" />
							<span v-if="error.city != ''" class="invalid-feedback">{{ error.city }}</span>
						</div>
						<div class="col-sm-4 mb-3" v-show="this.booking.prasadam">
							<label class="form-label">State <span class="text-red">*</span></label>
							<select id="state" v-model="booking.prasadam_address.state" class="form-control"
								@change="getDistricts" :class="{ 'is-invalid': error.state != '' }">
								<option value="">Select State</option>
								<option v-for="state in states" :key="state.id" :value="state.state_name">
									{{ state.state_name }}
								</option>
							</select>
							<span v-if="error.state != ''" class="invalid-feedback">{{ error.state }}</span>
						</div>
						<div class="col-sm-4 mb-3" v-show="this.booking.prasadam">
							<label class="form-label">District<span class="text-red">*</span></label>
							<select id="area" v-model="booking.prasadam_address.area" class="form-control"
								:class="{ 'is-invalid': error.area != '' }">
								<option value="">Select District</option>
								<option v-for="district in districts" :key="district.id"
									:value="district.district_name">
									{{ district.district_name }}
								</option>
							</select>
							<span v-if="error.area != ''" class="invalid-feedback">{{ error.area }}</span>
						</div>
						<div class="col-sm-4 mb-3" v-show="this.booking.prasadam">
							<label class="form-label">Pincode <span class="text-red">*</span></label>
							<input type="text" v-model="booking.prasadam_address.pincode" class="form-control"
								placeholder="Pincode" :class="{ 'is-invalid': error.pincode != '' }" />
							<span v-if="error?.pincode != ''" class="invalid-feedback">{{ error?.pincode }}</span>
						</div>
					</div>
					<div class="row" v-show="tab_no == 4">
						<div class="col-sm-4 mb-3">
							<label class="form-label">Street Address 1<span class="text-red">*</span></label>
							<input type="text" id="address" v-model="booking.prasadam_address.street_address_1"
								class="form-control" placeholder="Address"
								:class="{ 'is-invalid': error.address_1 != '' }" />
							<span v-if="error.address_1 != ''" class="invalid-feedback">{{ error.address_1 }}</span>
						</div>
						<div class="col-sm-4 mb-3">
							<label class="form-label">Street Address 2</label>
							<input type="text" id="address" v-model="booking.prasadam_address.street_address_2"
								class="form-control" placeholder="Address" />
						</div>
						<div class="col-sm-4 mb-3">
							<label class="form-label">City/Town/Village <span class="text-red">*</span></label>
							<input type="text" id="city" v-model="booking.prasadam_address.city" class="form-control"
								placeholder="City/Town/Village" :class="{ 'is-invalid': error.city != '' }" />
							<span v-if="error.city != ''" class="invalid-feedback">{{ error.city }}</span>
						</div>
						<div class="col-sm-4 mb-3">
							<label class="form-label">State <span class="text-red">*</span></label>
							<select id="state" v-model="booking.prasadam_address.state" class="form-control"
								@change="getDistricts" :class="{ 'is-invalid': error.state != '' }">
								<option value="">Select State</option>
								<option v-for="state in states" :key="state.id" :value="state.state_name">
									{{ state.state_name }}
								</option>
							</select>
							<span v-if="error.state != ''" class="invalid-feedback">{{ error.state }}</span>
						</div>
						<div class="col-sm-4 mb-3">
							<label class="form-label">District<span class="text-red">*</span></label>
							<select id="area" v-model="booking.prasadam_address.area" class="form-control"
								:class="{ 'is-invalid': error.area != '' }">
								<option value="">Select District</option>
								<option v-for="district in districts" :key="district.id"
									:value="district.district_name">
									{{ district.district_name }}
								</option>
							</select>
							<span v-if="error.area != ''" class="invalid-feedback">{{ error.area }}</span>
						</div>
						<div class="col-sm-4 mb-3">
							<label class="form-label">Pincode <span class="text-red">*</span></label>
							<input type="text" v-model="booking.prasadam_address.pincode" class="form-control"
								placeholder="Pincode" :class="{ 'is-invalid': error.pincode != '' }" />
							<span v-if="error.pincode != ''" class="invalid-feedback">{{ error.pincode }}</span>
						</div>
					</div>
					<div class="mb-0" v-if="request">
						<button @click="poojaSelections()" class="btn btn-primary w-100">
							Add to Cart
						</button>
						<!-- <label class="note">Note: Video availability is subject to temple
							consent</label> -->
					</div>
				</div>
			</div>
		</div>

		<div v-if="response">
			<div class="card-header border-bottom">
				<div style="float: right">
					<i class="fas fa-times-circle" style="font-size: 20px; color: rgb(255, 0, 0)"
						v-on:click="close()"></i>
				</div>
				<h5 class="mb-0">Order Details</h5>
			</div>
			<div class="card-body">
				<ul class="list-group list-group-borderless mb-3">
					<li class="list-group-item d-flex justify-content-between py-2">
						<span class="h6 fw-light mb-0">Pooja Cost</span>
						<span class="h6 fw-light mb-0">₹{{ payment?.payment_data?.original_cost }}</span>
					</li>
					<div v-show="this.booking.prasadam">
						<li class="list-group-item d-flex justify-content-between py-2">
							<span class="h6 fw-light mb-0">Prasadam Delivery</span>
							<span class="h6 fw-light mb-0">₹{{ payment?.payment_data?.delivery_charge }}</span>
						</li>
					</div>
					<li class="list-group-item d-flex justify-content-between py-2">
						<span class="h6 fw-light mb-0">Platform Fee</span>
						<span class="h6 fw-light mb-0">₹{{ payment?.payment_data?.convenience_fee }}</span>
					</li>
					<li class="list-group-item d-flex justify-content-between py-2">
						<span class="h6 fw-light mb-0">Tax</span>
						<span class="h6 fw-light mb-0">₹{{ payment?.payment_data?.total_tax }}</span>
					</li>

					<li class="list-group-item py-2">
						<hr class="my-0" />
					</li>
					<li class="list-group-item d-flex justify-content-between pb-0">
						<div>
							<h5 class="fw-normal mb-0">Total</h5>
							<small>Inc. of all taxes</small>
						</div>
						<span class="h5 fw-normal mb-0">₹{{ payment?.payment_data?.final_total }}</span>
					</li>
				</ul>
				<button @click="razorpayPayment" class="btn btn-primary w-100 mb-0">
					Place Order
				</button>
			</div>
		</div>
	</dialog>
	<dialog id="confirmation" class="dialtaga">
		<div class="card shadow mb-4">
			<div class="card-header border-bottom">
				<h5 class="mb-0">Confirmation ?</h5>
			</div>
			<div class="card-body">
				<div class="row">
					<div class="col-sm-6">
						<button class="btn w-100 btn-primary" @click="closeConfirmation()">Continue Adding</button>
					</div>
					<div class="col-sm-6">
						<router-link class="btn w-100 btn-primary" to="pooja_cart">Go to Cart</router-link>
					</div>
				</div>
			</div>
		</div>
	</dialog>
</template>
<script>
import "firebase/database";
import "firebase/compat/auth";
import moment from "moment";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { Carousel, Slide } from "vue3-carousel";
import { v4 as uuidv4 } from "uuid";

export default {
	name: "Temple",
	components: {
		VueDatePicker,
		Carousel,
		Slide,
	},

	data() {
		return {
			isMobileView: false,
			phoneNumber: "",
			verificationCode: "",
			verificationId: "",
			displayName: "",
			mobileNo: "",
			mobileNoError: "",
			search: "",
			rz_key: "",
			temple: {},
			poojas: [],
			prasads: [],
			startDate: moment().toDate(),
			booking: {
				pooja_id: "",
				pooja_name: "",
				pooja_price: 0,
				prasad_delivery: false,
				booking_date: null,
				name: "",
				mobile_no: "",
				comment: "",
				nakshatra: "",
				kula: "",
				gotra: "",
				rashi: "",
				nakshatra: "",
				prasadam: true,
				prasadam_address: {
					street_address_1: "",
					street_address_2: "",
					area: "",
					city: "",
					state: "",
					pincode: "",
				},
			},
			payment: {
				original_cost: 0,
				delivery_charge: 0,
				convenience_fee: 0,
				booking_charges: 0,
				total_tax: 0,
				final_total: 0
			},
			error: {
				booking_date: "",
				name: "",
				mobile_no: "",
				address_1: "",
				address_2: "",
				area: "",
				city: "",
				state: "",
				pincode: "",
			},
			request: false,
			response: false,
			signGoogle: true,
			updateProfile: false,

			booking_date: {
				startDate: "",
				endDate: "",
			},
			ref: null,
			order_id: "",
			googleEmail: "-",
			user: {
				mobile_number: "",
				login_token: "123",
				app_version: "1",
				device_model: "Browser",
				user_type: "Devotee",
			},
			token: "73bfce87b51fae1532245c5cd75b6cb03e4641d5",
			message: [],
			errors: [],
			setmobilelogin: false,
			newUser: false,
			ref: null,
			order_id: '',
			tab_no: 4,
			states: [],
			districts: [],
		};
	},
	computed: {
		/**
		 * Returns the number of items in the cart.
		 * @returns {number} The number of items in the cart.
		 */
		cartLength() {
			return this.$store.getters.cart.length;
		},
		/**
		 * Returns the cart object from the Vuex store.
		 * @returns {object} The cart object.
		 */
		getCart() {
			return this.$store.getters.cart
		},
		/**
		 * Returns the date two days from the current date.
		 * @returns {Date} The date two days from now.
		 */
		twoDaysFromNow() {
			return moment().add(2, "days").startOf("day").toDate();
		}
	},
	beforeRouteEnter(to, from, next) {
		/**
		 * Fetches temple data, poojas, and prasadam details before the component is rendered.
		 * @param {object} to - The route being navigated to.
		 * @param {object} from - The route being navigated from.
		 * @param {function} next - The function to call to resolve the hook.
		 */
		let vm = this;
		next((vm) => {
			vm.$store
				.dispatch("get", { uri: "devotee/temple/" + to.query.id })
        ///.dispatch("get", { uri: "devotee/temple/" + to.params.id })
				.then((response) => {
					vm.temple = response.data;
					vm.getPoojas(to.params.id);
         /// vm.getPoojas();
					vm.getPrasadam();
				})
				.catch((errors) => {
					console.log(errors);
				});
		});
	},

	mounted() {
		/**
		 * Initializes the component after it has been added to the DOM.
		 * - Scrolls to the top of the page.
		 * - Sets the mobile view flag based on window width.
		 * - Adds a resize event listener.
		 * - Checks for a stored mobile number to set the sign-in state.
		 * - Initializes the prasadam address.
		 */
		window.scrollTo(0, 0);
		this.isMobileView = window.innerWidth <= 768;
		window.addEventListener("resize", this.handleResize);
		let storedMobileNumber = localStorage.getItem("mobileNumber");
		if (
			storedMobileNumber != null &&
			storedMobileNumber != "null" &&
			// storedMobileNumber != "+919080706050"
			storedMobileNumber != "9080706050"
		) {
			this.$store.dispatch("setsignInMbl", true);
		}
		this.initPrasadamAddress();
	},

	beforeDestroy() {
		/**
		 * Removes the resize event listener before the component is destroyed to prevent memory leaks.
		 */
		// Remove the resize event listener to avoid memory leaks
		window.removeEventListener("resize", this.handleResize);
	},

	methods: {
		/**
		 * Retrieves the image URL for a given pooja object.
		 * It checks several possible locations within the pooja object and its nested objects.
		 * @param {object} pooja - The pooja object.
		 * @returns {string|null} The image URL or null if not found.
		 */
		getPoojaImage(pooja) {
			if (pooja.pooja_prasadam && pooja.pooja_prasadam.images && pooja.pooja_prasadam.images.length) {
				return pooja.pooja_prasadam.images[0].image || pooja.pooja_prasadam.images[0];
			}
			if (pooja.images && pooja.images.length) {
				return pooja.images[0].image || pooja.images[0];
			}
			if (pooja.image) {
				return pooja.image;
			}
			if (pooja.temple && pooja.temple.images && pooja.temple.images.length) {
				return pooja.temple.images[0].image || pooja.temple.images[0];
			}
			if (pooja.pooja_prasadam && pooja.pooja_prasadam.temple && pooja.pooja_prasadam.temple.images && pooja.pooja_prasadam.temple.images.length) {
				return pooja.pooja_prasadam.temple.images[0].image || pooja.pooja_prasadam.temple.images[0];
			}
			return null;
		},
		/**
		 * Updates the isMobileView data property based on the window's inner width.
		 */
		handleResize() {
			// Update isMobileView based on the window width
			this.isMobileView = window.innerWidth <= 768;
		},

		/**
		 * Closes the dialog with the id 'dialog'.
		 */
		closeModal() {
			document.getElementById("dialog").close();
		},
		/**
		 * Closes the dialog with the id 'payment'.
		 */
		close() {
			document.getElementById("payment").close();
		},
		/**
		 * Closes the dialog with the id 'confirmation'.
		 */
		closeConfirmation() {
			document.getElementById("confirmation").close();
		},
		/**
		 * Fetches the poojas for the current temple from the server.
		 * It also filters the results into poojas and prasads.
		 */
		getPoojas() {
			let vm = this;
			let loader = this.$loading.show();
			this.$store
				.dispatch("get", {
					uri:
						"devotee/pooja/?temple=" + vm.temple.id + "&search=" + this.search,
				})
				.then((response) => {
					loader.hide();
					let results = response.data.results;
					const regex = new RegExp('prasad', "i");
					vm.prasads = results.filter(item => regex.test(item.name));
					vm.poojas = results.filter(item => !regex.test(item.name));
					vm.getStates();
				})
				.catch((errors) => {
					console.log(errors);
				});
		},

		/**
		 * Fetches the prasadam for the current temple from the server.
		 */
		getPrasadam() {
			let vm = this;
			let loader = this.$loading.show();
			this.$store
				.dispatch("get", {
					uri:
						"devotee/prasadam/?temple=" + vm.temple.id + "&search=" + this.search,
				})
				.then((response) => {
					loader.hide();
					vm.prasads = response.data.results;
				})
				.catch((errors) => {
					loader.hide();
					console.log(errors);
				});
		},

		/**
		 * Fetches the list of states from the server.
		 */
		getStates() {
			let vm = this;
			this.$store.dispatch("get", {
				uri: "csc/dsp/states",
			}).then((response) => {
				vm.states = response.data;
				if (vm.booking.prasadam_address.state != "" && vm.booking.prasadam_address.state != null && vm.booking.prasadam_address.state != undefined) {
					vm.getDistricts();
				}
			}).catch((errors) => {
				console.log(errors);
			});
		},

		/**
		 * Fetches the list of districts for the selected state from the server.
		 */
		getDistricts() {
			let vm = this;
			let states = vm.states.filter((state) => {
				return state.state_name == vm.booking.prasadam_address.state;
			});
			if (states.length > 0) {
				let state_id = states[0].id;
				let loader = this.$loading.show();
				this.$store.dispatch("get", {
					uri: "csc/dsp/districts?state_id=" + state_id,
				}).then((response) => {
					vm.districts = response.data;
					loader.hide();
				}).catch((errors) => {
					console.log(errors);
					loader.hide();
				});
			}
		},

		/**
		 * Opens the booking dialog and populates it with the selected pooja's data.
		 * @param {object} pooja - The selected pooja object.
		 */
		bookPooja(pooja) {
			let vm = this;
			vm.response = false;
			document.getElementById("payment").showModal();
			vm.$store.dispatch("get", { uri: "devotee/constants/" }).then((response) => {
				let pooja_availability = response.data.pooja_availability;
				let pooja_booking_min_csc_estore =
					response.data.pooja_booking_min_csc_estore;
				vm.booking_date.startDate = moment()
					.add(pooja_booking_min_csc_estore, "d")
					.toDate();
				vm.booking_date.endDate = moment()
					.add(pooja_availability + pooja_booking_min_csc_estore, "d")
					.toDate();
				const selected = pooja.pooja_prasadam || pooja;
				vm.booking.booking_date = null;
				vm.booking.pooja_id = selected.id || pooja.id;
				vm.booking.pooja_name = selected.name || pooja.name;
				vm.booking.pooja_price =
					selected.final_total || selected.original_cost || pooja.final_total || pooja.original_cost;
				vm.booking.prasad_delivery = selected.prasad_delivery || pooja.prasad_delivery;
				if (selected.images && selected.images.length) {
					vm.booking.image = selected.images[0].image || selected.images[0];
				} else if (pooja.images && pooja.images.length) {
					vm.booking.image = pooja.images[0].image || pooja.images[0];
				} else if (pooja.image) {
					vm.booking.image = pooja.image;
				} else if (pooja.temple && pooja.temple.images && pooja.temple.images.length) {
					vm.booking.image = pooja.temple.images[0].image || pooja.temple.images[0];
				} else if (
					selected.temple &&
					selected.temple.images &&
					selected.temple.images.length
				) {
					vm.booking.image = selected.temple.images[0].image || selected.temple.images[0];
				} else {
					vm.booking.image = null;
				}
				vm.booking.pooja_cost = selected.original_cost || selected.cost || pooja.original_cost;
				vm.request = true;
			}).catch((errors) => {
				loader.hide();
				console.log(errors);
			});
		},
		/**
		 * Sends a request to the server to perform a pooja.
		 * @param {object} pooja - The pooja object to be requested.
		 */
		requestPooja(pooja) {
			let vm = this;
			let loader = this.$loading.show();
			vm.$store
				.dispatch("get", { uri: "devotee/pooja/" + pooja.id + "/request" })
				.then((response) => {
					loader.hide();
					alert("Pooja request has been successfully submited.");
				})
				.catch((errors) => {
					loader.hide();
					console.log(errors);
				});
		},

		/**
		 * Validates the pooja booking form and adds the selected pooja to the cart.
		 */
		poojaSelections() {
			let vm = this;
			let address_status = true;
			vm.error.booking_date = "";
			vm.error.name = "";
			vm.error.mobile_no = "";
			vm.error.address_1 = "";
			vm.error.area = "";
			vm.error.pincode = "";
			vm.error.city = "";
			vm.error.state = "";
			const pin_reg_ex = /^\d{4,6}\b/g;
			const regex = /^[6-9]\d{9}$/;
			if (!vm.booking.booking_date) {
				vm.error.booking_date = "The booking date is required"
			}
			if (vm.booking.name == '') {
				vm.error.name = "The devotee name is required"
			}
			if (vm.booking.mobile_no == '') {
				vm.error.mobile_no = "The devotee mobile number is required";
			} else if (!/^\d{10}$/.test(vm.booking.mobile_no)) {
				vm.error.mobile_no = "The mobile number must be a valid 10-digit number";
			} else {
				vm.error.mobile_no = "";
			}
			if (vm.tab_no == 4 && (vm.booking.prasadam_address.street_address_1 == '' || vm.booking.prasadam_address.street_address_1 == undefined)) {
				vm.error.address_1 = "Address is required for prasadam delivery";
				address_status = false;
			}
			if (vm.tab_no == 4 && (vm.booking.prasadam_address.area == '' || vm.booking.prasadam_address.area == undefined)) {
				vm.error.area = "Area is required";
				address_status = false;
			}
			if (vm.tab_no == 4 && (vm.booking.prasadam_address.city == '' || vm.booking.prasadam_address.city == undefined)) {
				vm.error.city = "City is required";
				address_status = false;
			}
			if (vm.tab_no == 4 && (vm.booking.prasadam_address.state == '' || vm.booking.prasadam_address.state == undefined)) {
				vm.error.state = "State is required";
				address_status = false;
			}

			if (vm.booking.prasadam && vm.booking.prasadam_address.street_address_1 == '') {
				vm.error.address_1 = "Address is required for prasadam delivery";
				address_status = false;
			}
			if (vm.booking.prasadam && (vm.booking.prasadam_address.pincode == '' || vm.booking.prasadam_address.pincode == null)) {
				vm.error.pincode = "Pincode is required";
				address_status = false;
			}
			if (vm.booking.prasadam_address.pincode) {
				if (vm.booking.prasadam && vm.booking.prasadam_address.pincode.length != 6) {
					vm.error.pincode = "Pincode should be of 6 digits";
					if (!pin_reg_ex.test(vm.booking.prasadam_address.pincode)) {
						vm.error.pincode = "Please enter a valid pincode!";
					}
					address_status = false;
				}
			}
			if (vm.booking.prasadam && vm.booking.prasadam_address.area == '') {
				vm.error.area = "Area is required";
				address_status = false;
			}
			if (vm.booking.prasadam && vm.booking.prasadam_address.city == '') {
				vm.error.city = "City is required";
				address_status = false;
			}
			if (vm.booking.prasadam && vm.booking.prasadam_address.state == '') {
				vm.error.state = "State is required";
				address_status = false;
			}
			if (vm.error.name == '' && vm.error.mobile_no == '' && vm.error.booking_date == '' && address_status) {
				let payload = {
					uri: 'devotee/pooja_request/',
					data: {
						pooja: vm.booking.pooja_id,
						pooja_name: vm.booking.pooja_name,
						pooja_date: moment(String(vm.booking.booking_date)).format('YYYY-MM-DD'),
						name: vm.booking.name,
						devotee_number: '+91' + vm.booking.mobile_no,
						is_prasadam_delivery: this.booking.prasadam,
						prasadam_address: {
							name: vm.booking.name,
							phone_number: '+91' + vm.booking.mobile_no,
							street_address_1: this.booking.prasadam_address.street_address_1,
							street_address_2: this.booking.prasadam_address.street_address_2,
							area: this.booking.prasadam_address.area,
							city: this.booking.prasadam_address.city,
							state: this.booking.prasadam_address.state,
							pincode: this.booking.prasadam_address.pincode,
						},
						family_member: [{
							id: null,
							name: vm.booking.name,
							father_name: "",
							kula: "",
							gotra: vm.booking.gotra,
							rashi: vm.booking.rashi,
							nakshatra: vm.booking.nakshatra,
							caste: "",
							subcaste: "",
							age: "",
							save_for_future: false,
							date_of_birth: null,
							place_of_birth: null,
							time_of_birth: null,
						}],
						comment: vm.booking.comment + "( Nakshatra :" + vm.booking.nakshatra + ")( Gotra :" + vm.booking.gotra + ")( Rashi : " + vm.booking.rashi + ")",
						booked_by: "CSC",
						image: vm.booking.image,
						pooja_cost: vm.booking.pooja_cost
					}

				};
				if (!this.booking.prasadam) {
					payload = {
						uri: 'devotee/pooja_request/',
						data: {
							pooja: vm.booking.pooja_id,
							pooja_name: vm.booking.pooja_name,
							pooja_date: moment(String(vm.booking.booking_date)).format('YYYY-MM-DD'),
							name: vm.booking.name,
							devotee_number: '+91' + vm.booking.mobile_no,
							is_prasadam_delivery: this.booking.prasadam,

							family_member: [{
								id: null,
								name: vm.booking.name,
								father_name: "",
								kula: "",
								gotra: vm.booking.gotra,
								rashi: vm.booking.rashi,
								nakshatra: vm.booking.nakshatra,
								caste: "",
								subcaste: "",
								age: "",
								save_for_future: false,
								date_of_birth: null,
								place_of_birth: null,
								time_of_birth: null,
							}],
							comment: vm.booking.comment + "( Nakshatra :" + vm.booking.nakshatra + ")( Gotra :" + vm.booking.gotra + ")( Rashi : " + vm.booking.rashi + ")",
							booked_by: "CSC",
							image: vm.booking.image,
							pooja_cost: vm.booking.pooja_cost
						}
					}
				}
				this.close();
				const pooja = { ...payload.data, sl_id: uuidv4(), quantity: 1 };
				this.$store.dispatch('addToCart', pooja);
				document.getElementById("confirmation").showModal();
			}
		},
		/**
		 * Fetches the Razorpay key from the server.
		 */
		getRZKey() {
			let vm = this;
			this.$store
				.dispatch("get", { uri: "devotee/payment_key/" })
				.then((response) => {
					vm.rz_key = response.data.key;
					vm.scrollToOrderDetails();
				})
				.catch((errors) => {
					console.log(errors);
				});
		},
		/**
		 * Initializes and opens the Razorpay payment dialog.
		 */
		razorpayPayment() {
			let vm = this;
			document.getElementById("payment").close();
			var options = {
				key: vm.rz_key,
				amount: this.payment.final_total * 100,
				currency: "INR",
				name: "Devalaya",
				description: "Payment towards Pooja",
				image:
					"https://cdn.shopify.com/s/files/1/0735/5895/0166/files/unnamed_copy_ac3ece77-8a3a-44b7-b0f2-820c39455044.jpg?v=1679241399&width=500",
				order_id: this.payment.payment_order_id,
				handler: function (response) {
					vm.placeOrder(response);
				},
				prefill: {
					name: this.devotee_name,
					email: "",
					contact: this.devotee_mobile,
				},
				notes: {
					address: "Devalaya",
				},
				theme: {
					color: "#df3002",
				},
			};
			var rzp1 = new Razorpay(options);
			rzp1.on("payment.failed", function (response) {
				// alert(JSON.stringify(response));
			});
			rzp1.open();
		},

		/**
		 * Sends the Razorpay payment response to the server to confirm the order.
		 * @param {object} rz_response - The response from Razorpay.
		 */
		placeOrder(rz_response) {
			let vm = this;
			let data = {
				razorpay_response: rz_response,
				request_id: vm.payment.id,
			};
			let loader = this.$loading.show();
			this.$store
				.dispatch("post", { uri: "devotee/pooja_request/payment/", data: data })
				.then((response) => {
					loader.hide();
					vm.$router.push({
						name: "order",
						params: {
							payment_id: rz_response.razorpay_payment_id,
							order_id: vm.order_id,
						},
					});
				})
				.catch((errors) => {
					loader.hide();
					console.log(errors);
				});
		},
		/**
		 * Scrolls the page to the order details section.
		 */
		scrollToOrderDetails() {
			this.$refs.orderDetails.scrollIntoView({ behavior: "smooth" });
		},
		/**
		 * Formats a date string to 'DD-MM-YYYY' format.
		 * @param {string} pooja_date - The date string to format.
		 * @returns {string} The formatted date string.
		 */
		formattedDate(pooja_date) {
			return moment(pooja_date).format('DD-MM-YYYY');
		},
		/**
		 * Removes a pooja from the cart.
		 * @param {object} pooja - The pooja to remove.
		 */
		removePooja(pooja) {
			let filteredPooja = this.$store.getters.cart.filter(item =>
				item.pooja !== pooja.pooja ||
				item.devotee_number !== pooja.devotee_number ||
				item.pooja_date !== pooja.pooja_date
			);
			this.$store.dispatch('setCart', filteredPooja);
		},
		/**
		 * Sends a bulk pooja request to the server.
		 */
		confirmOrder() {
			let vm = this;
			let payload = {
				uri: 'devotee/bulk_pooja_request/',
				data: {
					requests: this.$store.getters.cart
				}
			}
			let loader = this.$loading.show();
			this.$store.dispatch('post', payload)
				.then(response => {
					loader.hide();
					this.payments = response.data;
					this.calculateFinalCost();
					vm.request = false;
					vm.response = true;
					vm.getRZKey();
				})
				.catch(errors => {
					loader.hide();
					alert(errors.response.data.errors[0].message[0])
				})
		},
		/**
		 * Calculates the total cost of the order from the payment details.
		 */
		calculateFinalCost() {
			if (this.payments.length) {
				this.payment.id = this.payments[0].id;
				this.order_id = this.payments[0].order_id;
			}
			this.payment.original_cost = 0;
			this.payment.delivery_charge = 0;
			this.payment.convenience_fee = 0;
			this.payment.booking_charges = 0;
			this.payment.total_tax = 0;
			this.payment.final_total = 0;
			this.payments.forEach(obj => {
				this.payment.payment_order_id = obj.payment_order_id;
				this.payment.original_cost += parseFloat(obj.payment_data.original_cost);
				this.payment.delivery_charge += parseFloat(obj.payment_data.delivery_charge);
				this.payment.convenience_fee += parseFloat(obj.payment_data.convenience_fee);
				this.payment.booking_charges += parseFloat(obj.payment_data.booking_charges);
				this.payment.total_tax += parseFloat(obj.payment_data.total_tax);
				this.payment.final_total += parseFloat(obj.payment_data.final_total);
			});
		},
		/**
		 * Validates the mobile number input, allowing only 10 digits.
		 */
		validateMobileNumber() {
			this.booking.mobile_no = this.booking.mobile_no.replace(/\D/g, '').slice(0, 10);
		},
		/**
		 * Initializes the prasadam address with the user's address from the Vuex store.
		 */
		initPrasadamAddress() {
			this.booking.prasadam_address.street_address_1 = this.$store.getters.user.address;
			this.booking.prasadam_address.area = this.$store.getters.user.area;
			this.booking.prasadam_address.city = this.$store.getters.user.city;
			this.booking.prasadam_address.district = this.$store.getters.user.district;
			this.booking.prasadam_address.state = this.$store.getters.user.state;
			if (this.$store.getters.user.pincode) {
				this.booking.prasadam_address.pincode = this.$store.getters.user.pincode.toString();
			}
		},
		/**
		 * Sets the current tab number and handles prasadam-related logic.
		 * @param {number} tab - The tab number to set.
		 */
		setTabNo(tab) {
			this.tab_no = tab;
			if (tab == 4) {
				this.booking.prasadam = true;
				this.getPrasadam();
			} else {
				this.booking.prasadam = false;
			}
		}
	},
};
</script>
<style>
.text-red {
	color: red;
	font-weight: bold;
}

.note {
	display: inline-block;
	/* size: a3; */
	color: rgb(108 108 108);
	/* width: auto; */
	font-size: 13px;
}

.login-with-google-btn {
	transition: background-color 0.3s, box-shadow 0.3s;

	padding: 12px 16px 12px 42px;
	border: none;
	border-radius: 3px;
	box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 1px 1px rgba(0, 0, 0, 0.25);

	color: #757575;
	font-size: 14px;
	font-weight: 500;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
		Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;

	background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
	background-color: white;
	background-repeat: no-repeat;
	background-position: 12px 11px;

	&:hover {
		box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25);
	}

	&:active {
		background-color: #eeeeee;
	}

	&:focus {
		outline: none;
		box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.04), 0 2px 4px rgba(0, 0, 0, 0.25),
			0 0 0 3px #c8dafc;
	}

	&:disabled {
		filter: grayscale(100%);
		background-color: #ebebeb;
		cursor: not-allowed;
	}

	.body {
		text-align: center;
		padding-top: 2rem;
	}
}

.pt-0 {
	background-color: #fde5d1;
}

.dialtaga {
	min-width: 30%;
	max-width: 30%;
	border: 1px solid #ccc;
	border-radius: 8px;
	padding: 0px;
}
</style>


